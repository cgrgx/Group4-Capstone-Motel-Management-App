import supabase from "./supabase";

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
  const isAdmin = data.some((admin) => admin.role_id === 1);

  return isAdmin;
};
