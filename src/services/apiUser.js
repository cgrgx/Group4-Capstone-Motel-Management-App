import supabase from "./supabase";

export const getUserRoles = async (userId) => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("roles(name)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user roles", error);
    return [];
  }

  console.log("User roles:", data);

  return data.map((row) => row.roles.name);
};

export async function checkIfAdmin(userId) {
  try {
    const { data, error } = await supabase.rpc("get_claim", {
      uid: userId,
      claim: "claims_admin",
    });

    if (error) {
      console.error("Error fetching admin claim:", error);
      return false;
    }

    console.log("Admin claim:", data);
    // The claim value is expected to be a boolean, so we directly return the evaluation
    return data === true;
  } catch (err) {
    console.error("Exception when checking admin claim:", err);
    return false;
  }
}
