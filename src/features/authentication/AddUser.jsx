import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import SignupForm from "./SignupForm";

function AddUser() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Add User</Button>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setModalOpen}
          title="Create New User"
        >
          <SignupForm onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddUser;
