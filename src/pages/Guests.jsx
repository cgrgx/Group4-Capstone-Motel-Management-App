import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        <AddGuest />
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <GuestTable />
      </Row>
    </>
  );
}

export default Guests;
