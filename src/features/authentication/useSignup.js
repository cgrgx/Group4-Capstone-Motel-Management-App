import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation(
    async ({ fullName, email, password, role }) => {
      // Call the signup API
      const { user, error } = await signupApi({ fullName, email, password });
      if (error) {
        throw new Error(error.message);
      }
      return { user, role }; // Include role in the returned object
    },
    {
      onSuccess: async ({ user, role }) => {
        // Check if a role needs to be assigned
        if (user && role) {
          // Determine the role value
          const isAdmin = role === "admin" ? true : false;
          // const roleValue = role === "admin" ? "webadmin" : ""; // Adjust based on your actual role values

          try {
            const { data: roleData, error: roleError } = await supabase.rpc(
              "set_claim",
              {
                uid: user.id,
                claim: "claims_admin",
                value: isAdmin,
              },
            );

            if (roleError) {
              console.error("Error setting user role:", roleError.message);
              toast.error(`Error assigning role: ${roleError.message}`);
              return;
            }

            console.log("Role assigned:", roleData);
            toast.success(
              "Account and role successfully created! Please verify the new account from the user's email address.",
            );
          } catch (error) {
            console.error("Error during role assignment:", error);
            toast.error(`Error during role assignment: ${error.message}`);
          }
        } else {
          toast.success(
            "Account successfully created! Please verify the new account from the user's email address.",
          );
        }
      },
      onError: (error) => {
        toast.error(`Signup failed: ${error.message}`);
      },
    },
  );

  return { signup, isLoading };
}
