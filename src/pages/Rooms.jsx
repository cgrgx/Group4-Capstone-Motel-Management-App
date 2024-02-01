import { useEffect } from "react";
import RoomTable from "../features/rooms/RoomTable";
import { getRooms } from "../services/apiRooms";

function Rooms() {
  useEffect(() => {
    getRooms().then((data) => console.log(data));
  }, []);
  return (
    <div>
      <RoomTable />
    </div>
  );
}

export default Rooms;
