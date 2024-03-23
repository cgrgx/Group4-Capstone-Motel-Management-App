import { useState } from "react";

import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

function Dashboard() {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLoading } = useLogout();

  const { user, isAdmin } = useUser();
  console.log("user", user);

  // const {
  //   isLoading: adminLoading,
  //   isAdmin,
  //   error: adminError,
  // } = useAdmin(user?.id);
  // let isAdmin = user.app_metadata?.claims_admin || false;

  console.log("isAdmin", isAdmin);

  // if (adminLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div>
    //   {isAdmin ? (
    //     <h1 className="text-3xl">Admin</h1>
    //   ) : (
    //     <h1 className="text-3xl">User</h1>
    //   )}
    // </div>
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        {/* <DashboardFilter /> */}
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
