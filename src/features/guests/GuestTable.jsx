import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

import { useGuests } from "./useGuests";
import { useDeleteGuest } from "./useDeleteGuest";
import { Table } from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateGuestForm from "./CreateGuestForm";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import ToolTip from "../../ui/ToolTip";

const columnHelper = createColumnHelper();

const GuestTable = () => {
  const { isAdmin } = useUser();
  const { isLoading, guests } = useGuests();
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }
  const columns = [
    columnHelper.accessor("full_name", {
      cell: (info) => (
        <p className="truncate font-semibold">{info.getValue()}</p>
      ),
      header: () => "Guest Name",
    }),

    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => "Email",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone Number",
    }),

    columnHelper.accessor("actions", {
      id: "actions", // It's good practice to explicitly set an ID for non-accessor columns
      cell: (info) => (
        <>
          {isAdmin ? (
            <div className="flex items-center justify-center">
              <ToolTip
                text="Edit Guest"
                onClick={() => handleOpenUpdateModal(info.row.original)}
                className={"text-indigo-600 hover:text-indigo-900"}
              >
                <MdOutlineModeEdit />
              </ToolTip>
              <span className="mx-2 inline-block h-5 border-r-2 border-gray-300 align-middle" />
              <ToolTip
                text="Delete Guest"
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
  const handleOpenUpdateModal = (guest) => {
    setSelectedGuest(guest);
    setUpdateModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (guest) => {
    setSelectedGuest(guest);
    setDeleteModalOpen(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full">
      <Table data={guests} columns={columns} title="Guest List" />
      {/* Update Modal */}
      {isUpdateModalOpen && (
        <Modal
          open={isUpdateModalOpen}
          setOpen={setUpdateModalOpen}
          title="Update Guest"
        >
          <CreateGuestForm
            guestToUpdate={selectedGuest}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Delete Guest"
          type="delete"
        >
          <ConfirmDelete
            resourceName="guest"
            disabled={isDeleting}
            onConfirm={() => {
              deleteGuest(selectedGuest.id);
              handleCloseModal?.();
            }}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default GuestTable;
