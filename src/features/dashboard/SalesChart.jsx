import { AreaChart } from "@tremor/react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

import Heading from "../../ui/Heading";
import { formatCurrency } from "@/utils/helpers";

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      "Total Sales": bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.total_price, 0),
      "Extras Sales": bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extras_price, 0),
    };
  });
  console.log("data", data);

  // Function to calculate total sales revenue
  function calculateTotalSalesRevenue(dataObjects) {
    let totalRevenue = 0;
    for (const data of dataObjects) {
      totalRevenue += data["Total Sales"];
    }
    return totalRevenue;
  }
  const totalSalesRevenue = calculateTotalSalesRevenue(data);
  return (
    <>
      <div className="col-span-2 w-full rounded-md border border-gray-200 bg-gray-100 p-6 shadow-sm">
        <div className=" flex items-center justify-between border-b border-gray-300 pb-6 uppercase">
          <Heading as="h2">Sales Revenue</Heading>
          <p className="font-poppins text-2xl font-bold text-gray-600">
            {formatCurrency(totalSalesRevenue)}
          </p>
        </div>
        <AreaChart
          className="mt-8 h-96"
          data={data}
          index="label"
          yAxisWidth={76}
          categories={["Total Sales", "Extras Sales"]}
          colors={["indigo", "orange"]}
          valueFormatter={valueFormatter}
          margin={{ top: 16, right: 16, bottom: 24, left: 24 }}
          showLegend={true}
          showAnimation={true}
          animationDuration={2000}
        />
      </div>
    </>
  );
}

export default SalesChart;
