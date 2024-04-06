import AddGuest from "../features/guests/AddGuest";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Payments() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Payments</Heading>
        <AddGuest />
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        {/* <GuestTable /> */}
        <div>payments</div>
      </Row>
    </>
  );
}

export default Payments;
