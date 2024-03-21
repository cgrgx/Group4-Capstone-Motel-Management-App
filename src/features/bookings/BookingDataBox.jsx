import { format } from "date-fns";
import { HiOutlineCheckCircle, HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
  MdOutlineNightShelter,
  MdOutlineBedroomChild,
  MdOutlinePayments,
} from "react-icons/md";
import { IoMailOutline, IoPeopleOutline } from "react-icons/io5";

import { formatCurrency } from "@/utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";

function BookingDataBox({ booking }) {
  const moveBack = useMoveBack();
  const {
    status,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    room_price,
    extras_price,
    total_price,
    has_breakfast,
    is_paid,
    guests: { full_name: guestName, email, phone },
    rooms: { name: roomName, price: roomPrice },
  } = booking;
  return (
    <div className="flex flex-col gap-4 rounded-md border border-2">
      <div className="flex justify-between gap-8 bg-slate-200 p-4 font-semibold">
        <button onClick={moveBack} className=" text-indigo-600">
          &larr; Back to list
        </button>
        <p className="text-md flex items-center gap-2 font-semibold">
          <MdOutlineNightShelter className="text-xl text-indigo-500" />
          <span> Nights: {num_nights}</span>
        </p>
        <p className="text-md flex items-center gap-2 font-semibold">
          <MdOutlineBedroomChild className="text-xl text-indigo-500" />
          <span> Room: {roomName}</span>
        </p>
        <p
          className={`rounded-sm px-3 py-1 text-sm uppercase ${status === "checked-out" ? "bg-green-200 text-green-900" : status === "checked-in" ? "bg-indigo-200 text-indigo-900" : "bg-red-200 text-red-900"}`}
        >
          {status}
        </p>
        <p>
          {format(new Date(start_date), " MMM dd yyyy")} &mdash;
          {format(new Date(end_date), " MMM dd yyyy")}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-16 py-8">
        <p className="text-3xl font-bold">{guestName}</p>
        <p className="flex items-center gap-2 font-poppins text-sm">
          <IoMailOutline className="text-xl text-indigo-500" />
          <span>{email}</span>
        </p>
        <p className="flex items-center gap-2 font-poppins text-sm">
          <IoPeopleOutline className="text-xl text-indigo-500" />
          <span>Total Guests: {num_guests}</span>
        </p>
        <p className="flex items-center gap-2 font-poppins text-sm">
          <span className="text-xl text-indigo-500">
            <HiOutlineCheckCircle />
          </span>
          <span>Breakfast included? {has_breakfast ? "Yes" : "No"}</span>
        </p>
        <div className="flex items-center gap-2 font-poppins text-sm">
          <HiOutlineCurrencyDollar className="text-xl text-indigo-500" />
          <span>Total Price: {formatCurrency(total_price)}</span>
          {has_breakfast &&
            ` (${formatCurrency(room_price)} room + ${formatCurrency(
              extras_price,
            )} breakfast)`}
        </div>
        <p className="flex items-center gap-2 font-poppins ">
          <MdOutlinePayments className="text-xl text-indigo-500" />
          <span className="text-sm">
            Payment status:
            {is_paid ? (
              <span className="ml-2 font-medium text-green-500">Paid</span>
            ) : (
              <span className="ml-2 font-medium text-indigo-500">
                Will pay on arrival
              </span>
            )}
          </span>
        </p>
      </div>
      <footer className="flex justify-end border-t px-6 py-2">
        <p className="text-sm">
          Booked on: {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </footer>
    </div>
  );
}

export default BookingDataBox;
