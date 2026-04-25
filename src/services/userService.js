import supabase from "../lib/supabaseClients";

export async function getUserProfile() {
  // get logged-in auth user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user) return null;

  // fetch user row from "users" table
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user.id) // assumes id matches auth user id
    .single();

  if (error) throw new Error(error.message);
  // console.log(error);

  return data;
}

// Fetch all vendors
export async function getVendors() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "vendor");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getVendorById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "vendor")
    .eq("slug", id)
    .single();

  if (error) throw error;
  return data;
};
