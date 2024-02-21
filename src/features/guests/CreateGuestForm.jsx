import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";

import { useCreateGuest } from "./useCreateGuest";
import { useUpdateGuest } from "./useUpdateGuest";

function CreateGuestForm({ guestToUpdate = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isUpdating, updateGuest } = useUpdateGuest();
  const isWorking = isCreating || isUpdating;

  const { id: updateId, ...updateValues } = guestToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isUpdateSession)
      updateGuest(
        { newGuestData: { ...data }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createGuest(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full Name" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          disabled={isWorking}
          {...register("full_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Phone Number" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isWorking}
          {...register("phone", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Street" error={errors?.street?.message}>
        <Input
          type="text"
          id="street"
          disabled={isWorking}
          {...register("street", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="City" error={errors?.city?.message}>
        <Input
          type="text"
          id="city"
          disabled={isWorking}
          {...register("city", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Province" error={errors?.province?.message}>
        <Input
          type="text"
          id="province"
          disabled={isWorking}
          {...register("province", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Postal Code" error={errors?.postal?.message}>
        <Input
          type="text"
          id="postal"
          disabled={isWorking}
          {...register("postal", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Date of Birth" error={errors?.dob?.message}>
        <Input
          type="date"
          id="dob"
          disabled={isWorking}
          {...register("dob", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow hasButton={true}>
        {/* type is an HTML attribute! */}
        <ButtonGroup>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>
            {isUpdateSession ? "Update Guest" : "Create new Guest"}
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
