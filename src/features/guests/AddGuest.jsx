import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateGuestForm from "./CreateGuestForm";
import Button from "../../ui/Button";

function AddGuest() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Create Guest</Button>

      {isModalOpen && (
        <Modal open={isModalOpen} setOpen={setModalOpen} title="Create Guest">
          <CreateGuestForm onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddGuest;
