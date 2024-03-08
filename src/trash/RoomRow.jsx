// import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi"; // Corrected the import
// import { formatCurrency } from "../../utils/helpers";
// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { useCreateCabin } from "./useCreateCabin";
// import Modal from "../../ui/Modal";
// import ConfirmDialog from "../../ui/ConfirmDialog";
import Table from "../ui/Tablev1";
// import Menus from "../../ui/Menus";

function CabinRow({ room }) {
  //   const { deleteCabin, isDeleting } = useDeleteCabin();
  //   const { isCreating, createCabin } = useCreateCabin();
  console.log(room);
  const {
    id: roomId,
    image,
    name,
    regular_price,
    discount_price,
    max_capacity,
    description,
    bed_type,
  } = room;

  //   function handleDuplicate() {
  //     createCabin({
  //       name: `Copy of ${name}`,
  //       maxCapacity,
  //       regularPrice,
  //       discount,
  //       image,
  //       description,
  //     });
  //   }

  return (
    <Table.Row className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-6 border-b border-gray-200 px-6 py-3">
      <img
        src={image}
        alt={name}
        className="block h-auto w-16 -translate-x-2 scale-150 object-cover object-center"
      />
      <div className="font-custom text-lg font-semibold text-gray-600">
        {name}
      </div>
      <div>Fits up to {max_capacity} guests</div>
      <div className="font-custom font-semibold">{regular_price}</div>
      {discount_price ? (
        <div className="font-custom font-medium text-green-700">
          {discount_price}
        </div>
      ) : (
        <span>&mdash;</span>
      )}
      {/* <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="update">
                <Menus.Button icon={<HiPencil />} disabled={isCreating}>
                  Update
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />} disabled={isCreating}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="update">
            <CreateCabinForm cabinToUpdate={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDialog
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div> */}
    </Table.Row>
  );
}

// Tailwind CSS doesn't directly support custom fonts through utility classes.
// You'll need to extend your Tailwind configuration to include custom fonts, like so:
// theme: {
//   extend: {
//     fontFamily: {
//       custom: ['Sono', 'sans-serif'],
//     },
//   },
// },

export default CabinRow;
