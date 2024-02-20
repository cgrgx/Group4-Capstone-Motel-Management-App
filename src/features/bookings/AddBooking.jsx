import React, { useState } from "react";
import Modal from "../../ui/Modal";
import AddBookingForm from "./AddBookingForm";
import Button from "../../ui/Button";

function AddBooking() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Add Booking</Button>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setModalOpen}
          title="Add new booking"
        >
          <AddBookingForm onCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddBooking;
