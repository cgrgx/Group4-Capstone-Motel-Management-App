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
      {/* <div className="flex flex-col gap-4 rounded-md border border-2">
        <div className="flex justify-between gap-8 bg-slate-200 p-4 font-semibold">
          <button onClick={moveBack} className=" text-indigo-600">
            &larr; Back to list
          </button>
          <p className="font-poppins flex items-center gap-2 text-sm">
            <MdOutlineNightShelter className="text-xl text-indigo-500" />
            <span> Nights: {num_nights}</span>
          </p>
          <p className="font-poppins flex items-center gap-2 text-sm">
            <MdOutlineBedroomChild className="text-xl text-indigo-500" />
            <span> Room: {roomName}</span>
          </p>
          <p
            className={`rounded-sm px-3 py-1 text-sm uppercase ${status === "checked-out" ? "bg-green-200 text-green-900" : status === "checked-in" ? "bg-indigo-200 text-indigo-900" : "bg-red-200 text-red-900"}`}
          >
            {status}
          </p>
          <p>
            {format(new Date(start_date), " MMM dd yyyy")} &mdash;
            {format(new Date(end_date), " MMM dd yyyy")}
          </p>
        </div>
        <div className="flex flex-col gap-4 px-16 py-8">
          <p className="text-3xl font-bold">{guestName}</p>
          <p className="font-poppins flex items-center gap-2 text-sm">
            <IoMailOutline className="text-xl text-indigo-500" />
            <span>{email}</span>
          </p>
          <p className="font-poppins flex items-center gap-2 text-sm">
            <IoPeopleOutline className="text-xl text-indigo-500" />
            <span>Total Guests: {num_guests}</span>
          </p>
          <p className="font-poppins flex items-center gap-2 text-sm">
            <span className="text-xl text-indigo-500">
              <HiOutlineCheckCircle />
            </span>
            <span>Breakfast included? {has_breakfast ? "Yes" : "No"}</span>
          </p>
          <div className="font-poppins flex items-center gap-2 text-sm">
            <HiOutlineCurrencyDollar className="text-xl text-indigo-500" />
            <span>Total Price: {formatCurrency(total_price)}</span>
            {has_breakfast &&
              ` (${formatCurrency(room_price)} room + ${formatCurrency(
                extras_price,
              )} breakfast)`}
          </div>
          <p className="font-poppins flex items-center gap-2 ">
            <MdOutlinePayments className="text-xl text-indigo-500" />
            <span className="text-sm">
              Payment status:
              {is_paid ? (
                <span className="ml-2 font-medium text-green-500">Paid</span>
              ) : (
                <span className="ml-2 font-medium text-indigo-500">
                  Will pay on arrival
                </span>
              )}
            </span>
          </p>
        </div>
        <footer className="flex justify-end border-t px-6 py-2">
          <p className="text-sm">
            Booked on: {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </footer>
      </div> */}

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
