import { useUser } from "../features/authentication/useUser";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import DashboardFilter from "@/features/dashboard/DashboardFilter";
import Uploader from "@/data/Uploader";

function Dashboard() {
  // const { user, isAdmin } = useUser();
  // console.log("user", user);
  // console.log("isAdmin", isAdmin);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
      {/* <Row type="horizontal">
        <Uploader />
      </Row> */}
    </>
  );
}

export default Dashboard;
