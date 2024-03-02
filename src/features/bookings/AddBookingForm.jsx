import { Controller, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";

import { useAddNewBooking } from "./useAddNewBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { useSettings } from "../settings/useSettings";
import { useRooms } from "../rooms/useRooms";
import { useGuests } from "../guests/useGuests";
import ListBox from "../../ui/Listbox";
import Combobox from "../../ui/Combobox";
import { useEffect } from "react";

function AddBookingForm({ bookingToUpdate = {}, onCloseModal }) {
  const { isAdding, addNewBooking } = useAddNewBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const { rooms, isLoading: isRoomsLoading } = useRooms();
  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const isWorking = isAdding || isUpdating;

  const { id: updateId, ...updateValues } = bookingToUpdate;
  const isUpdateSession = Boolean(updateId);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  const watchedRoomId = watch("room_id");
  const hasBreakfast = watch("breakfast");

  // set room price
  useEffect(() => {
    if (watchedRoomId && rooms) {
      setValue(
        "room_price",
        rooms?.find((room) => room.id === watchedRoomId)?.regular_price,
      );
    }
  }, [watchedRoomId, rooms, setValue]);

  // set extras price
  useEffect(() => {
    if (hasBreakfast) {
      setValue("extras_price", settings?.breakfast_price);
    }
  }, [hasBreakfast, settings, setValue]);

  // set total price
  useEffect(() => {
    const numNights = parseInt(watch("num_nights"), 10) || 0; // Convert to number, default to 0 if NaN
    const numGuests = parseInt(watch("num_guests"), 10) || 0; // Convert to number, default to 0 if NaN
    const roomPrice = parseFloat(watch("room_price")) || 0; // Assuming room_price can be a floating point number
    const breakfastIncluded = watch("breakfast") === "yes"; // Assuming 'yes' is the value for breakfast included
    const breakfastPrice = parseFloat(settings?.breakfast_price) || 0; // Convert to number, default to 0 if NaN

    // Calculate extras price based on breakfast selection
    const extrasPrice = breakfastIncluded ? breakfastPrice * numGuests : 0; // Breakfast for one day only

    // Calculate total price
    const totalPrice =
      roomPrice * numNights + extrasPrice * (breakfastIncluded ? 1 : 0); // Extras only added once

    setValue("total_price", totalPrice);
  }, [watch, setValue, settings?.breakfast_price]);

  // const totalPrice =
  //   room_price * num_nights +  * num_guests * num_nights;

  function onSubmit(data) {
    console.log("form data", data);
    const bookingData = {
      guest_id: data.guest_id,
      room_id: data.room_id,
      start_date: data.start_date,
      end_date: data.end_date,
      num_nights: data.num_nights,
      num_guests: data.num_guests,
      total_price: data.total_price,
      status: data.status,
      has_breakfast: data.breakfast,
      is_paid: data.paid,
      room_price: data.room_price,
      extras_price: data.extras_price,
    };
    addNewBooking(bookingData);
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Guest" error={errors?.guest_id?.message}>
        {/* <select {...register("guest_id", { required: "Guest is required" })}>
          {guests?.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.full_name}
            </option>
          ))}
        </select> */}
        {!isGuestsLoading && (
          <Controller
            name="guest_id"
            control={control}
            rules={{ required: "Guest is required" }}
            render={({ field }) => (
              <Combobox
                items={guests}
                selected={field.value}
                onChange={(selectedItem) => {
                  field.onChange(selectedItem.id);
                }}
              />
            )}
          />
        )}
      </FormRow>

      <FormRow label="Start date" error={errors?.start_date?.message}>
        <input
          type="date"
          id="start_date"
          {...register("start_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.end_date?.message}>
        <input
          type="date"
          id="end_date"
          {...register("end_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Room" error={errors?.room_id?.message}>
        {/* <select {...register("room_id", { required: "Room is required" })}>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select> */}
        {!isRoomsLoading && (
          <Controller
            name="room_id"
            control={control}
            rules={{ required: "Room is required" }}
            render={({ field }) => (
              <ListBox
                items={rooms}
                selected={field.value}
                onChange={(selectedItem) => {
                  field.onChange(selectedItem.id);
                }}
              />
            )}
          />
        )}
      </FormRow>

      <FormRow label="Number of nights" error={errors?.num_nights?.message}>
        <Input
          type="number"
          id="num_nights"
          disabled={isWorking}
          {...register("num_nights", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.num_guests?.message}>
        <Input
          type="number"
          disabled={isWorking}
          {...register("num_guests", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Room Price">
        <Input
          type="number"
          disabled={isWorking}
          {...register("room_price")}
        />
      </FormRow>

      <FormRow label="Extras Price">
        <Input
          type="number"
          disabled={isWorking}
          {...register("extras_price",)}
        />
      </FormRow>

      <FormRow label="Total Price" >
        <Input
          type="number"
          disabled={isWorking}
          {...register("total_price",)}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <select {...register("status", { required: "Status is required" })}>
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
          {...register("breakfast", { required: "This field is required" })}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </FormRow>

      <FormRow label="Do you want to pay now?" error={errors?.paid?.message}>
        <select {...register("paid", { required: "This field is required" })}>
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
  );
}

export default AddBookingForm;
