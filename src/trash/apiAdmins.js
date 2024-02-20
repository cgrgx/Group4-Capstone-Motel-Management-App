import supabase from "../services/supabase";

export const getAdmins = async (userId) => {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching admins", error);
    throw new Error(error.message);
  }
  // admin role_id = 1 in the database
  console.log("admins", data);
  const isAdmin = data.some((admin) => admin.role_id === 1);

  return isAdmin;
};
