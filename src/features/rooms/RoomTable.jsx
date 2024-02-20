import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

import { useRooms } from "./useRooms";
import { useDeleteRoom } from "./useDeleteRoom";
import { Table } from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateRoomForm from "./CreateRoomForm";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";

const columnHelper = createColumnHelper();

const RoomTable = () => {
  const { isAdmin } = useUser();
  const { isLoading, rooms } = useRooms();
  const { isDeleting, deleteRoom } = useDeleteRoom();

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <p className="truncate font-semibold">{info.getValue()}</p>
      ),
      header: () => <span>Room Name</span>,
    }),
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="room image"
          className="h-20 w-20 object-cover"
        />
      ),
      header: () => <span>Image</span>,
    }),
    columnHelper.accessor("bed_type", {
      cell: (info) => info.renderValue(),
      header: () => "Bed",
    }),
    columnHelper.accessor("max_capacity", {
      header: "Max Capacity",
    }),
    columnHelper.accessor("regular_price", {
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor("discount_price", {
      cell: (info) => (
        <span
          className={`rounded-md px-3 py-1 text-sm ${info.getValue() >= 50 ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}
        >
          {info.getValue()}{" "}
        </span>
      ),
      header: () => "Discount",
    }),
    columnHelper.accessor("actions", {
      id: "actions", // It's good practice to explicitly set an ID for non-accessor columns
      cell: (info) => (
        <>
          {isAdmin ? (
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleOpenUpdateModal(info.row.original)}
                className="text-xl text-indigo-600 hover:text-indigo-900"
              >
                <MdOutlineModeEdit />
              </button>
              <span className="mx-2 inline-block h-5 border-r-2 border-gray-300 align-middle" />
              <button
                onClick={() => handleOpenDeleteModal(info.row.original)}
                className="text-xl text-red-600 hover:text-red-900"
              >
                <MdOutlineDelete />
              </button>
            </div>
          ) : (
            <p>Your are not an admin</p>
          )}
        </>
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  // Open Update Modal
  const handleOpenUpdateModal = (room) => {
    setSelectedRoom(room);
    setUpdateModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (room) => {
    setSelectedRoom(room);
    setDeleteModalOpen(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full">
      <Table data={rooms} columns={columns} title="Room List" />
      {/* Update Modal */}
      {isUpdateModalOpen && (
        <Modal
          open={isUpdateModalOpen}
          setOpen={setUpdateModalOpen}
          title="Update Room"
        >
          <CreateRoomForm
            roomToUpdate={selectedRoom}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Delete Room"
          type="delete"
        >
          <ConfirmDelete
            resourceName="room"
            disabled={isDeleting}
            onConfirm={() => {
              deleteRoom(selectedRoom.id);
              handleCloseModal?.();
            }}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoomTable;
