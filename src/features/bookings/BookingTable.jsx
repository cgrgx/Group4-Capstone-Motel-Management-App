import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { format, isToday } from "date-fns";

import { useBookings } from "./useBookings";
import { useDeleteBooking } from "./useDeleteBooking";
import { Table } from "../../ui/Table";
import Modal from "../../ui/Modal";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import ConfirmDialog from "../../ui/ConfirmDialog";
import Spinner from "../../ui/Spinner";
import ToolTip from "../../ui/ToolTip";
import AddBookingForm from "./AddBookingForm";
import Empty from "../../ui/Empty";

const columnHelper = createColumnHelper();

const BookingTable = () => {
  const navigate = useNavigate();
  const { isLoading, bookings } = useBookings();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resourceName="bookings" />;
  }
  const columns = [
    columnHelper.accessor("rooms", {
      cell: (info) => (
        <p className="truncate font-semibold">{info.getValue().name}</p>
      ),
      header: () => <span>Room Name</span>,
    }),

    columnHelper.accessor("guests", {
      cell: (info) => (
        <p className="font-semibold">{info.getValue()?.full_name}</p>
      ),
      header: () => <span>Guest Name</span>,
    }),
    columnHelper.accessor(
      (row) => ({
        startDate: row.start_date,
        endDate: row.end_date,
        numNights: row.num_nights,
      }),
      {
        cell: (info) => {
          const { startDate, endDate, numNights } = info.getValue();

          return (
            <>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {isToday(new Date(startDate))
                    ? "Today"
                    : formatDistanceFromNow(startDate)}
                  &rarr; {numNights} night stay
                </span>
                <span>
                  {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                  {format(new Date(endDate), "MMM dd yyyy")}
                </span>
              </div>
            </>
          );
        },
        header: () => <span>Booking Dates</span>,
        id: "booking_dates",
      },
    ),

    columnHelper.accessor("status", {
      cell: (info) => (
        <span
          className={`rounded-md px-3 py-1 text-sm ${info.getValue() !== "unconfirmed" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}
        >
          {info.getValue()}
        </span>
      ),
      header: () => "Status",
    }),
    columnHelper.accessor("total_price", {
      cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      header: () => <span>Ammount</span>,
    }),
    columnHelper.accessor("actions", {
      id: "actions",
      cell: (info) => (
        <>
          <div className="flex items-center justify-center">
            <ToolTip
              text="See booking Details"
              onClick={() => handleBookingDetail(info.row.original)}
              className={"text-green-600 hover:text-green-900"}
            >
              <CgDetailsMore />
            </ToolTip>
            <span className="mx-2 inline-block h-5 border-r-2 border-gray-300 align-middle" />
            <ToolTip
              text="Edit booking"
              onClick={() => handleOpenUpdateModal(info.row.original)}
              className={"text-indigo-600 hover:text-indigo-900"}
            >
              <MdOutlineModeEdit />
            </ToolTip>
            <span className="mx-2 inline-block h-5 border-r-2 border-gray-300 align-middle" />
            <ToolTip
              text="Delete booking"
              onClick={() => handleOpenDeleteModal(info.row.original)}
              className={"text-red-600 hover:text-red-900"}
            >
              <MdOutlineDelete />
            </ToolTip>
          </div>
        </>
      ),
      header: () => "Actions",
    }),
  ];

  // Handle Booking Detail
  const handleBookingDetail = (booking) => {
    navigate(`/bookings/${booking.id}`);
  };

  // Open Update Modal
  const handleOpenUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setUpdateModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setDeleteModalOpen(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full">
      <Table data={bookings} columns={columns} title="Booking List" />
      {/* Update Modal */}
      {isUpdateModalOpen && (
        <Modal
          open={isUpdateModalOpen}
          setOpen={setUpdateModalOpen}
          title="Update Booking"
        >
          <AddBookingForm
            bookingToUpdate={selectedBooking}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Delete Booking"
          type="delete"
        >
          <ConfirmDialog
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(selectedBooking.id);
              handleCloseModal?.();
            }}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookingTable;
