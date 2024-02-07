import { useState } from "react";
import { useEffect } from "react";

import supabase from "../services/supabase";
import { checkIfAdmin, getUserRoles } from "../services/apiUser";
import { useLogout } from "../features/authentication/useLogout";
import UsersList from "../features/authentication/UserList";
import CreateUserComponent from "../features/authentication/CreateUser";

function Dashboard() {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLoading } = useLogout();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkIfAdmin().then(setIsAdmin);
  }, []);

  console.log("admin", isAdmin);

  useEffect(() => {
    const fetchRoles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const roles = await getUserRoles(user.id);
        const checkAdmin = await checkIfAdmin(user.id);
        console.log("roles", roles);
        console.log("checkAdmin", checkAdmin);
        setUserRoles(roles);
      }

      setLoading(false);
    };

    fetchRoles();
  }, []);
  console.log("userRoles", userRoles);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {userRoles.includes("admin") ? <p>admin</p> : <p>user</p>}
      <button onClick={logout}>Sign out</button>
      {/* <UsersList /> */}
      <CreateUserComponent />
    </div>
  );
}

export default Dashboard;
