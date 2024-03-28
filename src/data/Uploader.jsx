import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { dataBookings } from "./data-bookings";
import { dataRooms } from "./data-rooms";
import { dataGuests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteRooms() {
  const { error } = await supabase.from("rooms").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(dataGuests);
  if (error) console.log(error.message);
}

async function createRooms() {
  const { error } = await supabase.from("rooms").insert(dataRooms);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a roomId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and roomIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((room) => room.id);
  const { data: roomsIds } = await supabase
    .from("rooms")
    .select("id")
    .order("id");
  const allRoomIds = roomsIds.map((room) => room.id);

  const finalBookings = dataBookings.map((booking) => {
    // Here relying on the order of rooms, as they don't have and ID yet
    const room = dataRooms.at(booking.room_id - 1);
    const num_nights = subtractDates(booking.end_date, booking.start_date);
    const room_price = num_nights * (room.regular_price - room.discount_price);
    const extras_price = booking.has_breakfast
      ? num_nights * 15 * booking.num_guests
      : 0; // hardcoded breakfast price
    const total_price = room_price + extras_price;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights,
      room_price,
      extras_price,
      total_price,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      room_id: allRoomIds.at(booking.room_id - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteRooms();

    // Bookings need to be created LAST
    await createGuests();
    await createRooms();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
