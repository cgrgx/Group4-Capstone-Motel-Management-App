import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import { useUser } from "./useUser";
import { useUsers } from "./useUsers";
import { useSetAdmin } from "./useSetAdmin";

import SignupForm from "./SignupForm";
import { Table } from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const columnHelper = createColumnHelper();

const UserTable = () => {
  const { isAdmin } = useUser();
  const { isLoading, users } = useUsers();
  const { setAdmin, isUpdating } = useSetAdmin();

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
            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleMakeAdmin(info.row.original)}
                variation="green"
                disabled={!isUpdating}
              >
                Make Admin
              </Button>
            </div>
          ) : (
            <p>Your are not an admin</p>
          )}
        </>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  // make selected user an admin
  const handleMakeAdmin = (user) => {
    setAdmin(user.id);
  };

  return (
    <div className="w-full">
      <Table data={users} columns={columns} title="Users" />
    </div>
  );
};

export default UserTable;
