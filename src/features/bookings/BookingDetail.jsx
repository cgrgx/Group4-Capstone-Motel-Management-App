import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";
import BookingDataBox from "./BookingDataBox";

function BookingDetail() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting: isDeletingBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  // Handle Close Modal
  const handleCloseModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-8">
          <Heading as="h1">Booking #{bookingId}</Heading>
        </div>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="indigo"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}
        <Button
          variation="red"
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeletingBooking}
        >
          Delete booking
        </Button>

        {isDeleteModalOpen && (
          <Modal
            open={isDeleteModalOpen}
            setOpen={setDeleteModalOpen}
            title="Delete Booking"
            type="delete"
          >
            <ConfirmDialog
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() => {
                deleteBooking(booking.id, {
                  onSettled: () => {
                    navigate(-1);
                  },
                });
                handleCloseModal?.();
              }}
              onCloseModal={handleCloseModal}
            />
          </Modal>
        )}
        <Button variation="gray" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
