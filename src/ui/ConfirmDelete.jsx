import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({ resourceName, onConfirm, disabled }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="text-lg">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button variation="secondary" onClick={() => onConfirm(false)}>
          Cancel
        </Button>
        <Button variation="red" onClick={onConfirm} disabled={disabled}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
