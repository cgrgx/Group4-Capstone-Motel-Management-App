import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
  let { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms data could not be loaded");
  }
  return data;
}

export async function createUpdateRoom(newRoom, id) {
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // "https://mofrvwztbqezxgauffoe.supabase.co/storage/v1/object/public/room-images/0.35495806172293-cabin-001.jpg"

  // 1. Create/Update Room
  let query = supabase.from("rooms");
  //1.1. Create
  if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

  //1.2. Update
  if (id) query = query.update({ ...newRoom, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be created");
  }

  // 2. Upload new image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.image);

  //3. Delete the Room IF there was an error uploading image
  if (storageError) {
    await supabase.from("rooms").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Room image could not be uploaded and the Room was not created",
    );
  }
  return data;
}

export async function deleteRoom(id) {
  const { data, error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Room could not be deleted");
  }
  return data;
}
