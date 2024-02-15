import { useState } from "react";
import SignupForm from "../features/authentication/SignupForm";
import { useUsers } from "../features/authentication/useUsers";
import supabase from "../services/supabase";
import Heading from "../ui/Heading";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useSetAdmin } from "../features/authentication/useSetAdmin";

function Users() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  console.log("user", user);
  const { isLoading, users } = useUsers();
  console.log("users", users);
  // const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setAdmin, isUpdating } = useSetAdmin();

  // const handleMakeAdmin = async (userId) => {
  //   setLoading(true);
  //   setError(null);

  //   const { data, error } = await supabase.rpc("set_claim", {
  //     uid: userId,
  //     claim: "claims_admin",
  //     value: true,
  //   });

  //   if (error) {
  //     setError(error.message);
  //   } else {
  //     console.log("data", data);
  //     console.log("User successfully made an admin");
  //     // queryClient.invalidateQueries(["users"]);
  //     // alert("User successfully made an admin");
  //   }
  //   setLoading(false);
  // };

  return (
    <>
      <div className="flex">
        <Heading as="h4">New User</Heading>
      </div>
      <div className="overflow-x-auto border border-red-500 p-4">
        <table className="min-w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Created At</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>{user.created_at}</td>
                <td>{user.created_at}</td>
                <td>
                  <button onClick={() => setAdmin(user.id)}>
                    {user.app_metadata?.claims_admin
                      ? "Remove Admin"
                      : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SignupForm />
    </>
  );
}

export default Users;
