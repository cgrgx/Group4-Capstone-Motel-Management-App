function TodayItem({ activity }) {
  const { id, status, guests, rooms, num_nights, is_paid } = activity;

  return (
    <li className="grid grid-cols-5 items-center gap-5 border-b py-2 font-poppins text-lg">
      <span className="text-lg font-medium">{guests.full_name}</span>
      {status === "unconfirmed" && (
        <span className="w-24 rounded-md bg-green-200 p-2 text-center text-sm uppercase text-green-900">
          Arriving
        </span>
      )}
      {status === "checked-in" && (
        <span className="w-24 rounded-md bg-indigo-200 p-2 text-center text-sm uppercase text-indigo-900">
          Departing
        </span>
      )}
      <span className="text-lg ">{rooms.name}</span>
      <span>{num_nights} nights</span>
      <span
        className={`w-24 rounded-md ${is_paid === false ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"} p-1 text-center text-sm`}
      >
        {is_paid ? "Paid" : "Due"}
      </span>
    </li>
  );
}

export default TodayItem;
