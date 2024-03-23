import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, roomCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.total_price, 0);

  const checkIns = confirmedStays.length;

  const occupancy =
    confirmedStays.reduce((acc, curr) => acc + curr.num_nights, 0) /
    (numDays * roomCount);

  const occupancyRate = `${Math.round(occupancy * 100)}%`;

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase className="h-10 w-10 text-blue-700" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes className="h-10 w-10 text-green-700" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        icon={<HiOutlineCalendarDays className="h-10 w-10 text-indigo-700" />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar className="h-10 w-10 text-yellow-700" />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
