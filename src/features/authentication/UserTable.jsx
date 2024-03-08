import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { RiAdminLine } from "react-icons/ri";

import { useUser } from "./useUser";
import { useUsers } from "./useUsers";
import { useSetAdmin } from "./useSetAdmin";

import SignupForm from "./SignupForm";
import { Table } from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ToolTip from "../../ui/ToolTip";
import ConfirmDialog from "@/ui/ConfirmDialog";

const columnHelper = createColumnHelper();

const UserTable = () => {
  const { isAdmin } = useUser();
  const { isLoading, users } = useUsers();
  const { setAdmin, isUpdating } = useSetAdmin();
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }
  const columns = [
    columnHelper.accessor("email", {
      cell: (info) => (
        <p className="truncate font-semibold">{info.getValue()}</p>
      ),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("full_name", {
      cell: (info) => info.renderValue(),
      header: () => "Full Name",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => (
        <p className="truncate">{format(info.getValue(), "yyyy-MM-dd")}</p>
      ),
      header: "Created At",
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.renderValue(),
      header: () => "Role",
    }),
    columnHelper.accessor("action", {
      id: "action", // It's good practice to explicitly set an ID for non-accessor columns
      cell: (info) => (
        <>
          {isAdmin ? (
            <ToolTip
              text="Make Admin"
              onClick={() => handleOpenAdminModal(info.row.original)}
              className={"text-red-600 hover:text-red-900"}
            >
              <RiAdminLine />
            </ToolTip>
          ) : (
            <p>Your are not an admin</p>
          )}
        </>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const handleOpenAdminModal = (user) => {
    setSelectedUser(user);
    setAdminModalOpen(true);
  };

  const handleCloseModal = () => {
    setAdminModalOpen(false);
  };

  return (
    <div className="w-full">
      <Table data={users} columns={columns} title="Users" />
      {isAdminModalOpen && (
        <Modal
          open={isAdminModalOpen}
          setOpen={setAdminModalOpen}
          title="Make Admin?"
        >
          <ConfirmDialog
            resourceName="user"
            disabled={isUpdating}
            onConfirm={() => {
              setAdmin(selectedUser.id);
              handleCloseModal?.();
            }}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
