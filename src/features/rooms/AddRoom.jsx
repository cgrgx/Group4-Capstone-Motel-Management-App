import React, { useState } from "react";
import Modal from "../../ui/Modal";
import CreateRoomForm from "./CreateRoomForm";
import Button from "../../ui/Button";

function AddRoom() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Create Room</Button>

      {isModalOpen && (
        <Modal open={isModalOpen} setOpen={setModalOpen} title="Create Room">
          <CreateRoomForm />
        </Modal>
      )}
    </div>
  );
}

export default AddRoom;
