import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded!");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted!");
  }
  return data;
};

export const createEditCabin = async (newCabin, id) => {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://ogatgoqtxldrolidcedn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE CABIN 
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) UPDATE/EDIT Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const {data, error} = await query.select().single(); 

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created!");
  }

  if (hasImagePath) return data;
  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created!"
    );
  }

  return data;
};
// export const addCabin = async (newCabin) => {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//   // https://ogatgoqtxldrolidcedn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select()
//     .single();

//   if (error) {
//     console.log(error);
//     throw new Error("Cabins could not be created!");
//   }

//   // const avatarFile = event.target.files[0];
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.log(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and cabin was not created!"
//     );
//   }

//   return data;
// };
