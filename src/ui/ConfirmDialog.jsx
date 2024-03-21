import Button from "./Button";

function ConfirmDialog({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-full flex-col gap-5">
      {resourceName === "regular" ? (
        <p className="text-lg">
          Are you sure you want to make this {resourceName} user an admin?
        </p>
      ) : resourceName === "admin" ? (
        <p className="text-lg">
          Are you sure you want to remove this user from the
          {resourceName} role?
        </p>
      ) : (
        <p className="text-lg">
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          onClick={onCloseModal}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button variation="red" onClick={onConfirm} disabled={disabled}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDialog;
