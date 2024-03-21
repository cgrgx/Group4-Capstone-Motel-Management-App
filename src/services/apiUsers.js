import supabase from "./supabase";

export const getUsers = async () => {
  const { data, error } = await supabase.from("users_role").select("*");

  if (error) {
    console.error("Error fetching users", error);
    throw new Error(error.message);
  }
  return data;
};
