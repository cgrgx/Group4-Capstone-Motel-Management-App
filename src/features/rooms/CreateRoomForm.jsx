import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";

import { useCreateRoom } from "./useCreateRoom";
import { useUpdateRoom } from "./useUpdateRoom";

function CreateRoomForm({ roomToUpdate = {}, onCloseModal }) {
  const { isCreating, createRoom } = useCreateRoom();
  const { isUpdating, updateRoom } = useUpdateRoom();
  const isWorking = isCreating || isUpdating;

  const { id: updateId, ...updateValues } = roomToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isUpdateSession)
      updateRoom(
        { newRoomData: { ...data, image }, id: updateId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createRoom(
        { ...data, image: image },
        {
          onSuccess: (data) => {
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
      <FormRow label="Room name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Room Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isUpdateSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Bed Type" error={errors?.bed_type?.message}>
        <Input
          type="text"
          id="bed_type"
          disabled={isWorking}
          {...register("bed_type", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price($)" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount($)" error={errors?.discount_price?.message}>
        <Input
          type="number"
          id="discount_price"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount_price", {
            required: "This field is required",
            validate: (value) =>
              parseInt(value, 10) < parseInt(getValues("regular_price"), 10) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for room"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow hasButton={true}>
        {/* type is an HTML attribute! */}
        <ButtonGroup>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>{isUpdateSession ? "Update room" : "Create new room"}</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;
