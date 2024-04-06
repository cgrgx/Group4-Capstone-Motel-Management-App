import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "@/ui/Checkbox";
import Spinner from "../../ui/Spinner";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useServices } from "../services/useServices";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const { booking, isLoading: isLoadingBooking } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { isLoading: isLoadingServices, services } = useServices();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => {
    // Check if booking is paid already
    setConfirmPaid(booking?.is_paid ?? false);

    // Check if booking has services
    services?.map((service) => {
      booking?.services?.map((bookingService) => {
        if (service.id === bookingService.id) {
          setSelectedServices((prev) => [...prev, bookingService.id]);
        }
      });
    });
  }, [booking, services]);

  let isLoading = isLoadingBooking || isLoadingServices || isLoadingSettings;

  if (isLoading) return <Spinner />;

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

  const servicePrice = booking.services?.reduce(
    (total, service) => total + service.price,
    0,
  );

  const totalWithExtras =
    (addBreakfast ? optionalBreakfastPrice : 0) +
    (selectedServices.length > 0 ? servicePrice : 0);

  console.log(totalWithExtras);

  function handleCheckin() {
    if (!confirmPaid) return;

    try {
      const extras = {
        has_breakfast: addBreakfast,
        extras_price: totalWithExtras,
        total_price: total_price + totalWithExtras,
      };

      checkin({
        bookingId,
        extras,
        selectedServices,
      });
    } catch (err) {
      console.log(err);
      toast.error(`There was an error while checking in: ${err.message}`);
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />
      <div className="flex flex-col gap-4 rounded-md bg-slate-200 p-4">
        <div className="w-50 flex gap-6">
          <h3 className="text-lg font-semibold">Services: </h3>
          {services &&
            services.map((service) => (
              <Checkbox
                key={service.id}
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={() => {
                  const updatedServices = selectedServices.includes(service.id)
                    ? selectedServices.filter((id) => id !== service.id)
                    : [...selectedServices, service.id];
                  setSelectedServices(updatedServices);
                  console.log("toggle");
                  setConfirmPaid(false);
                }}
                // disabled={selectedServices.includes(service.id)} // Disable if already chosen during booking
                disabled={service.availability === false} // Disable if service is not available
              >
                {service.service_name}-{formatCurrency(service.price)}
                {!service.availability && (
                  <span className="text-sm text-red-500">(Not available)</span>
                )}
              </Checkbox>
            ))}

          {services.length === 0 && <p>No services</p>}
        </div>
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
            : `${formatCurrency(total_price + totalWithExtras)} 
              `}
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
