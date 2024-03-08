import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

import { useRooms } from "./useRooms";
import { useDeleteRoom } from "./useDeleteRoom";
import { Table } from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";
import CreateRoomForm from "./CreateRoomForm";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { formatCurrency } from "../../utils/helpers";
import ToolTip from "../../ui/ToolTip";

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
      header: () => "Room Name",
    }),
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="room image"
          className="h-20 w-20 rounded-lg object-cover"
        />
      ),
      header: () => "Image",
    }),
    columnHelper.accessor("bed_type", {
      cell: (info) => info.getValue(),
      header: () => "Bed",
    }),
    columnHelper.accessor("max_capacity", {
      cell: (info) => <span>{info.getValue()} people</span>,
      header: "Max Capacity",
    }),
    columnHelper.accessor("regular_price", {
      cell: (info) => formatCurrency(info.getValue()),
      header: () => "Regular Price",
    }),
    columnHelper.accessor("discount_price", {
      cell: (info) => formatCurrency(info.getValue()),
      header: () => "Discount Price",
    }),
    columnHelper.accessor("actions", {
      id: "actions", // It's good practice to explicitly set an ID for non-accessor columns
      cell: (info) => (
        <>
          {isAdmin ? (
            <div className="flex items-center justify-center">
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
          ) : (
            <p>Your are not an admin</p>
          )}
        </>
      ),
      header: () => "Actions",
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
          <ConfirmDialog
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
