import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useRooms } from "../rooms/useRooms";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
// import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

// const StyledDashboardLayout = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-template-rows: auto 34rem auto;
//   gap: 2.4rem;
// `;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { rooms, isLoading: isLoadingRooms } = useRooms();

  if (isLoadingBookings || isLoadingStays || isLoadingRooms) return <Spinner />;

  return (
    <div className="grid h-auto grid-cols-4 grid-rows-[auto_34rem_auto] gap-8">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        roomCount={rooms.length}
      />
      <DurationChart confirmedStays={confirmedStays} />
      {/* <TodayActivity />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </div>
  );
}

export default DashboardLayout;
