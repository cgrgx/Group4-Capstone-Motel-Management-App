import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonGroup from "../../ui/ButtonGroup";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function SettingsForm() {
  const { isLoading, settings } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: settings?.minBookingLength,
      maxBookingLength: settings?.maxBookingLength,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking,
      breakfastPrice: settings?.breakfastPrice,
    },
  });

  const onSubmit = (data) => {
    updateSetting(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights" error={errors.minBookingLength?.message}>
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          {...register("minBookingLength", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum nights" error={errors.maxBookingLength?.message}>
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum guests"
        error={errors.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Breakfast price" error={errors.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow hasButton={true}>
        <ButtonGroup>
          <Button variation="gray" type="reset" disabled={isUpdating}>
            Clear
          </Button>
          <Button type="submit" variation="orange" disabled={isUpdating}>
            Save
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default SettingsForm;
