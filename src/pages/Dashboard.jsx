import { useState } from "react";

import { useLogout } from "../features/authentication/useLogout";
import { useAdmin } from "../features/authentication/useAdmins";
import { useUser } from "../features/authentication/useUser";

function Dashboard() {
  const { user } = useUser();
  console.log(user);

  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLoading } = useLogout();

  const { isLoading: adminLoading, isAdmin, error: adminError } = useAdmin();

  console.log("isAdmin", isAdmin);

  if (adminLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAdmin ? (
        <h1 className="text-3xl">Admin</h1>
      ) : (
        <h1 className="text-3xl">User</h1>
      )}
    </div>
  );
}

export default Dashboard;
