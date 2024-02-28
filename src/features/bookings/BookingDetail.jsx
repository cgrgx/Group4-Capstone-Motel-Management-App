import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";

import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function BookingDetail() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { booking, isLoading } = useBooking();
  console.log(booking);
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting: isDeletingBooking } = useDeleteBooking();
  const { updateBooking, isUpdating: isUpdateBooking } = useUpdateBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const {
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    room_price,
    extras_price,
    total_price,
    has_breakfast,
    is_paid,
    guests: { full_name: guestName, email, phone },
    rooms: { name: roomName, price: roomPrice },
  } = booking;

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
        <button onClick={moveBack}>&larr; Back</button>
      </Row>

      {/* <BookingDataBox booking={booking} /> */}
      <div className="flex flex-col gap-4 border border-red-500">
        <div className="flex justify-between gap-8 bg-slate-200 p-4">
          <span>Night: {num_nights}</span>
          <span>Room: {roomName}</span>
          <span>{status}</span>
          <p>
            {format(new Date(start_date), "EEE, MMM dd yyyy")} (
            {isToday(new Date(start_date))
              ? "Today"
              : formatDistanceFromNow(start_date)}
            ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-slate-100 p-4">
          <span>Guest: {guestName}</span>
          <span>Email: {email}</span>
          <span>Phone: {phone}</span>
          <span>Guests: {num_guests}</span>
          <span>Price: ${room_price}</span>
          <span>Extras: ${extras_price}</span>
          <span>Total: ${total_price}</span>
          <span>Breakfast: {has_breakfast ? "Yes" : "No"}</span>
        </div>
      </div>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        {/* <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>
        </Modal> */}
        <Button
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeletingBooking}
        >
          Delete booking
        </Button>

        {isDeleteModalOpen && (
          <Modal
            open={isDeleteModalOpen}
            setOpen={setDeleteModalOpen}
            title="Delete Room"
            type="delete"
          >
            <ConfirmDelete
              resourceName="room"
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
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
