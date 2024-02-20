import AddRoom from "../features/rooms/AddRoom";
import RoomTable from "../features/rooms/RoomTable";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";

function Rooms() {
  const { isAdmin } = useUser();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        {isAdmin && <AddRoom />}
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <RoomTable />
      </Row>
    </>
  );
}

export default Rooms;
