import { useEffect, useState } from "react";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import Checkbox from "@/ui/Checkbox";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  console.log("booking", booking);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  console.log("settings", settings);

  // Check if booking is paid already
  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * num_nights * num_guests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        breakfast: { has_breakfast: false, extras_price: 0, total_price },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />
      <div className="flex flex-col gap-4 rounded-md bg-slate-200 p-4">
        {!has_breakfast && (
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id={"breakfast"}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        )}

        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.full_name} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(total_price + optionalBreakfastPrice)} 
              (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="gray" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
