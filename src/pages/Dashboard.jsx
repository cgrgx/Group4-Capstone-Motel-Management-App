import { useState } from "react";
import { useEffect } from "react";

import supabase from "../services/supabase";
import { getAdmins } from "../services/apiAdmins";
import { useLogout } from "../features/authentication/useLogout";
import UsersList from "../features/authentication/UserList";
import CreateUserComponent from "../features/authentication/CreateUser";
import { useUser } from "../features/authentication/useUser";
import { useAdmin } from "../features/authentication/useAdmins";

function Dashboard() {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLoading } = useLogout();

  const { isLoading: adminLoading, isAdmin, error: adminError } = useAdmin();

  console.log("isAdmin", isAdmin);

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
