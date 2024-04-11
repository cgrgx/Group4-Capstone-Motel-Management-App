import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

// import { useGuests } from "./useGuests";
// import { useDeleteGuest } from "./useDeleteGuest";
import { Table } from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";
// import CreateGuestForm from "./CreateGuestForm";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import ToolTip from "../../ui/ToolTip";
import { useServices } from "./useServices";
import { formatCurrency } from "@/utils/helpers";

const columnHelper = createColumnHelper();

const ServicesTable = () => {
  const { isAdmin } = useUser();
  const { isLoading, services } = useServices();
  // const { isDeleting, deleteGuest } = useDeleteGuest();

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [seletedService, setSeletedService] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }
  const columns = [
    columnHelper.accessor("service_name", {
      cell: (info) => (
        <p className="truncate font-semibold">{info.getValue()}</p>
      ),
      header: () => "Service Name",
    }),

    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: () => "Description",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      header: "Price",
    }),
    columnHelper.accessor("availability", {
      cell: (info) => (
        <span
          className={`rounded-md px-3 py-1 text-sm ${info.getValue() === true ? "bg-green-200 text-green-900" : "bg-indigo-200 text-indigo-900"}`}
        >
          {info.getValue() === true ? "Available" : "Not Available"}
        </span>
      ),
      header: "Availability",
    }),

    // columnHelper.accessor("actions", {
    //   id: "actions", // It's good practice to explicitly set an ID for non-accessor columns
    //   cell: (info) => (
    //     <>
    //       {isAdmin ? (
    //         <div className="flex items-center justify-center">
    //           <ToolTip
    //             text="Edit Service"
    //             onClick={() => handleOpenUpdateModal(info.row.original)}
    //             className={"text-indigo-600 hover:text-indigo-900"}
    //           >
    //             <MdOutlineModeEdit />
    //           </ToolTip>
    //           <span className="mx-2 inline-block h-5 border-r-2 border-gray-300 align-middle" />
    //           <ToolTip
    //             text="Delete Service"
    //             onClick={() => handleOpenDeleteModal(info.row.original)}
    //             className={"text-red-600 hover:text-red-900"}
    //           >
    //             <MdOutlineDelete />
    //           </ToolTip>
    //         </div>
    //       ) : (
    //         <p>Your are not an admin</p>
    //       )}
    //     </>
    //   ),
    //   header: () => "Actions",
    // }),
  ];

  // Open Update Modal
  // const handleOpenUpdateModal = (service) => {
  //   setSeletedService(service);
  //   setUpdateModalOpen(true);
  // };

  // Open Delete Modal
  // const handleOpenDeleteModal = (service) => {
  //   setSeletedService(service);
  //   setDeleteModalOpen(true);
  // };

  // Handle Close Modal
  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full">
      <Table data={services} columns={columns} title="Service List" />
      {/* Update Modal */}
      {/* {isUpdateModalOpen && (
        <Modal
          open={isUpdateModalOpen}
          setOpen={setUpdateModalOpen}
          title="Update Service"
        >
          <CreateServiceForm
            ServiceToUpdate={seletedService}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )} */}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Delete Service"
          type="delete"
        >
          <ConfirmDialog
            resourceName="service"
            // disabled={isDeleting}
            onConfirm={() => {
              // deleteService(seletedService.id);
              handleCloseModal?.();
            }}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ServicesTable;
