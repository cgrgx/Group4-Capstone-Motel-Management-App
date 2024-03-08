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
      minBookingLength: settings?.min_booking_length,
      maxBookingLength: settings?.max_booking_length,
      maxGuests: settings?.max_guests,
      breakfastPrice: settings?.breakfast_price,
    },
  });

  const onSubmit = (data) => {
    const settings = {
      min_booking_length: data.minBookingLength,
      max_booking_length: data.maxBookingLength,
      max_guests: data.maxGuests,
      breakfast_price: data.breakfastPrice,
    };
    updateSetting(settings);
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

      <FormRow label="Maximum guests" error={errors.maxGuests?.message}>
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          {...register("maxGuests", {
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
