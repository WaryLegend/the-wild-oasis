import supabase, { supabaseUrl } from "./supabase";

export async function Signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options --> additional data might need to store beside email and password
    options: {
      data: { fullName, avatar: "" },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data; // session & user
}

export async function getCurrentUser() {
  const { data: userSession } = await supabase.auth.getSession();
  if (!userSession.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  console.log(updateData);
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  console.log(data);
  if (!avatar) return data;

  //2.1. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //2.2. update avatar in the user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error.message);

  return updateUser;
}
