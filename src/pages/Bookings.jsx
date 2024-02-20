import BookingTable from "../features/bookings/BookingTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import AddBooking from "../features/bookings/AddBooking";
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <AddBooking />
        {/* <BookingTableOperations /> */}
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
