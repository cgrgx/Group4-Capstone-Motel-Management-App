import AddRoom from "../features/rooms/AddRoom";
import RoomTable from "../features/rooms/RoomTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <AddRoom />
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <RoomTable />
      </Row>
    </>
  );
}

export default Rooms;
