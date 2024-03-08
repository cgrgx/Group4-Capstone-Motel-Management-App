import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";

import { DatePicker } from "@/ui/DatePicker";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";
import Combobox from "../../ui/Combobox";
import ListBox from "../../ui/Listbox";
import { useAddNewBooking } from "./useAddNewBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { useSettings } from "../settings/useSettings";
import { useRooms } from "../rooms/useRooms";
import { useGuests } from "../guests/useGuests";
import AddGuest from "../guests/AddGuest";
import { subtractDates } from "../../utils/helpers";

function AddBookingForm({ bookingToUpdate = {}, onCloseModal }) {
  const { isAdding, addNewBooking } = useAddNewBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const { rooms, isLoading: isRoomsLoading } = useRooms();
  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  console.log("settings", settings);

  const isWorking =
    isAdding ||
    isUpdating ||
    isGuestsLoading ||
    isRoomsLoading ||
    isSettingsLoading;

  const { id: updateId, ...updateValues } = bookingToUpdate;
  const isUpdateSession = Boolean(updateId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  // Populate form fields with fetched guest and room data
  useEffect(() => {
    if (
      !isGuestsLoading &&
      !isRoomsLoading &&
      Object.keys(updateValues).length > 0
    ) {
      setValue("guest_id", updateValues.guests?.id || "");
      setValue("room_id", updateValues.rooms?.id || "");
    }
  }, [isGuestsLoading, isRoomsLoading, updateValues, setValue]);

  // Add validation rules for num_guests
  useEffect(() => {
    if (!isSettingsLoading && settings) {
      // Update the validation rules for num_guests
      register("num_guests", {
        required: "This field is required",
        max: {
          value: settings.max_guests,
          message: `Maximum guests is ${settings.max_guests}`,
        },
        valueAsNumber: true,
      });
    }
  }, [isSettingsLoading, settings, register]);

  // Handle form submission
  function onSubmit(formData) {
    const numGuests = parseInt(formData.num_guests) || 1;
    const breakfastIncluded = formData.breakfast === "yes";
    const breakfastPrice = parseFloat(settings?.breakfast_price) || 0;

    // Get the room price based on the selected room id from database
    const roomPrice = rooms?.find(
      (room) => room.id === formData.room_id,
    )?.regular_price;

    // Calculate the number of nights
    const differenceInDays = subtractDates(
      format(formData.end_date, "yyyy-MM-dd"),
      format(formData.start_date, "yyyy-MM-dd"),
    );

    // Check if the booking length exceeds the maximum
    let numNights = differenceInDays;
    if (differenceInDays >= settings.max_booking_length) {
      setError("end_date", {
        type: "manual",
        message: `Exceeds maximum booking length of ${settings.max_booking_length} days`,
      });
      return;
    }

    // Calculate the extras price
    const extrasPrice = breakfastIncluded
      ? breakfastPrice * numGuests + breakfastPrice * numNights
      : 0;

    // Calculate the total price
    const totalPrice = roomPrice * numNights + extrasPrice;

    const booking = {
      guest_id: formData.guest_id,
      room_id: formData.room_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      num_nights: numNights,
      num_guests: formData.num_guests,
      total_price: totalPrice,
      status: formData.status,
      has_breakfast: formData.breakfast,
      is_paid: formData.paid,
      room_price: roomPrice,
      extras_price: extrasPrice,
    };

    // Add or update the booking
    if (isUpdateSession)
      updateBooking(
        { id: updateId, newBookingData: booking },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      addNewBooking(booking, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-end">
        <AddGuest />
      </div>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Room" error={errors?.room_id?.message}>
          {!isRoomsLoading && (
            <Controller
              name="room_id"
              control={control}
              rules={{ required: "Room is required" }}
              render={({ field }) => (
                <ListBox
                  items={rooms}
                  selected={field.value || ""}
                  onChange={(selectedItem) => {
                    field.onChange(selectedItem.id);
                  }}
                />
              )}
            />
          )}
        </FormRow>

        <FormRow label="Guest" error={errors?.guest_id?.message}>
          <div className="flex w-full flex-col gap-y-2">
            {!isGuestsLoading && (
              <Controller
                name="guest_id"
                control={control}
                rules={{ required: "Guest is required" }}
                render={({ field }) => (
                  <Combobox
                    items={guests}
                    selected={field.value || ""}
                    onChange={(selectedItem) => {
                      field.onChange(selectedItem.id);
                    }}
                  />
                )}
              />
            )}
          </div>
        </FormRow>

        <FormRow label="Start date" error={errors?.start_date?.message}>
          <DatePicker
            control={control}
            name="start_date"
            rules={{ required: "Start date is required" }}
          />
        </FormRow>

        <FormRow label="End date" error={errors?.end_date?.message}>
          <DatePicker
            control={control}
            name="end_date"
            rules={{ required: "End date is required" }}
          />
        </FormRow>

        <FormRow label="Number of guests" error={errors?.num_guests?.message}>
          <Input
            type="number"
            disabled={isWorking}
            {...register("num_guests", {
              required: "This field is required",
              valueAsNumber: true,
            })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <select
            className="text-medium w-full rounded-sm border border-gray-300 bg-gray-50
          px-4 py-2  shadow-sm"
            {...register("status", { required: "Status is required" })}
          >
            <option value="unconfirmed">Unconfirmed</option>
            <option value="checked_in">Checked-In</option>
            <option value="checked_out">Checked-Out</option>
          </select>
        </FormRow>

        <FormRow
          label="Do you want breakfast?"
          error={errors?.breakfast?.message}
        >
          <select
            className="text-medium w-full rounded-sm border border-gray-300 bg-gray-50
         px-4 py-2  shadow-sm"
            {...register("breakfast", { required: "This field is required" })}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </FormRow>

        <FormRow label="Do you want to pay now?" error={errors?.paid?.message}>
          <select
            className="text-medium w-full rounded-sm border border-gray-300 bg-gray-50
         px-4 py-2  shadow-sm"
            {...register("paid", { required: "This field is required" })}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </FormRow>

        <FormRow hasButton={true}>
          {/* type is an HTML attribute! */}
          <ButtonGroup>
            <Button variation="secondary" type="reset">
              Cancel
            </Button>
            <Button>
              {isUpdateSession ? "Update booking" : "Create new booking"}
            </Button>
          </ButtonGroup>
        </FormRow>
      </Form>
    </div>
  );
}

export default AddBookingForm;
