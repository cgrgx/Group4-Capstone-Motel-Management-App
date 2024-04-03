import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="col-span-4 flex flex-col gap-9 rounded-md border bg-gray-50 p-12 pt-10">
      <div className="flex justify-between gap-2">
        <Row type="horizontal">
          <div className=" border-b border-gray-300 pb-6 uppercase">
            <Heading as="h2">Today's Activities</Heading>
          </div>
        </Row>
        <p className="mr-10 text-xl font-semibold text-gray-500">
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>
      {!isLoading ? (
        activities.length > 0 ? (
          <ul className="flex flex-col gap-2 overflow-scroll overflow-x-hidden">
            {activities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-center text-lg font-semibold">
            No activity today
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
