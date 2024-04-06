import { getToday } from "../utils/helpers";
import supabase from "./supabase";

import { PAGE_SIZE } from "../utils/constants";

// export async function getBookings({ filters, sortBy, page }) {
//   let query = supabase
//     .from("bookings")
//     .select(
//       "id, created_at,start_date, end_date, num_nights, num_guests, status, total_price, rooms(name), guests(full_name,email)",
//       { count: "exact" },
//     );

//   // 1. FILTER
//   if (filters)
//     // To filter by multiple fields
//     // filters.forEach((filter) => {
//     //   query = query[filter.method || "eq"](filter.field, filter.value);
//     // });
//     query = query[filters.method || "eq"](filters.field, filters.value);

//   // 2. SORT
//   if (sortBy)
//     query = query.order(sortBy.field, {
//       ascending: sortBy.direction === "asc",
//     });

//   if (page) {
//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE - 1;
//     query = query.range(from, to);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not be loaded");
//   }

//   return { data, count };
// }

export async function getBookings() {
  let { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at,start_date, end_date, num_nights, num_guests, status, total_price, rooms(id, name), guests(id, full_name,email)",
      { count: "exact" },
    );

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, rooms(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// booking with services
export async function getBookingWithServices(id) {
  // Fetch booking details
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .select("*, rooms(*), guests(*)")
    .eq("id", id);

  if (bookingError) {
    console.error(bookingError);
    throw new Error("Booking not found");
  }

  // Fetch service bookings associated with the booking
  const { data: serviceBookingsData, error: serviceBookingsError } =
    await supabase
      .from("services_bookings")
      .select("service_id")
      .eq("booking_id", id);

  if (serviceBookingsError) {
    console.error(serviceBookingsError);
    throw new Error("Error fetching service bookings");
  }

  // Extract service IDs from service bookings data
  const serviceIds = serviceBookingsData.map((row) => row.service_id);

  // Fetch service details using the extracted service IDs
  const { data: servicesData, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .in("id", serviceIds);

  if (servicesError) {
    console.error(servicesError);
    throw new Error("Error fetching services");
  }

  // Merge booking data with service data
  const bookingWithServices = {
    ...bookingData[0],
    services: servicesData,
  };

  return bookingWithServices;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Today's activity
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, email, phone), rooms(name)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`,
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// export async function addNewBooking(obj) {
//   const { data, error } = await supabase.from("bookings").insert(obj).select();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

export async function addNewBooking(obj, selectedServices) {
  console.log("api", selectedServices);
  // Insert booking into the bookings table
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .insert(obj)
    .select();

  if (bookingError) {
    console.error(bookingError);
    throw new Error("Booking could not be created");
  }

  const bookingId = bookingData[0].id;

  // Insert entries into the services_bookings table for each selected service
  const serviceInsertPromises = selectedServices.map(async (serviceId) => {
    const { error: serviceBookingError } = await supabase
      .from("services_bookings")
      .insert([{ booking_id: bookingId, service_id: serviceId }])
      .select();

    if (serviceBookingError) {
      console.error(serviceBookingError);
      throw new Error("Error associating services with booking");
    }
  });

  await Promise.all(serviceInsertPromises);

  return bookingData;
}

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

export async function updateBooking(id, obj, selectedServices = []) {
  console.log("api", selectedServices);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // Delete existing service associations for this booking
  await supabase.from("services_bookings").delete().eq("booking_id", id);

  // Insert new service associations for this booking
  const serviceInsertPromises = selectedServices?.map(async (serviceId) => {
    const { error: serviceBookingError } = await supabase
      .from("services_bookings")
      .insert([{ booking_id: id, service_id: serviceId }])
      .select();

    if (serviceBookingError) {
      console.error(serviceBookingError);
      throw new Error("Error associating services with booking");
    }
  });

  await Promise.all(serviceInsertPromises);

  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
