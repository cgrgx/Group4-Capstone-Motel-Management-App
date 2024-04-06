import supabase from "./supabase";

export async function getServices() {
  let { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error(error);
    throw new Error("Services data could not be loaded");
  }
  return data;
}

export async function createUpdateGuest(newGuest, id) {
  // 1. Create/Update Guest
  let query = supabase.from("guests");
  //1.1. Create
  if (!id) query = query.insert([{ ...newGuest }]);

  //1.2. Update
  if (id) query = query.update({ ...newGuest }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }
  return data;
}
