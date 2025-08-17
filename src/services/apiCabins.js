import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be load");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // Check whether that cabin already has an imagePath or not
  const hasImagePath = Boolean(newCabin.image?.startsWith?.(supabaseUrl));

  // https://gfwbwubjxhammheefvsx.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // 0. image url --> store in database --> use for calling the img in bucket
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName} `;

  // 1. create new data and insert to supacase
  let query = supabase.from("cabins");
  // A. ADD / CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B. EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  // "data" is optional for log, mostly for return what data has changed
  //  "single" Return that row as an object, rather than an array. Throw an error if the result contains zero or more than one row.

  if (error) {
    console.error(error);
    throw new Error(
      id ? "Cabin failed to be edited" : "Cabin could not be created"
    );
  }
  // 2. upload image to bucket
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      // delete by id
      .eq("id", data.id);
    console.error(storageError);
    throw new Error("There was an error uploading image. Please try again!");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from("cabins")
    .delete()
    // delete by id
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not deleted");
  }
}
