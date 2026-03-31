import supabase from "../lib/supabaseClients";

// Upload image
export const uploadProductImage = async (file) => {
  if (!file) return "";

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("product-image")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("product-image")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

// Add product (FULL DATA)
export const addProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// services/ProductService.js
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export async function getProductsByUser() {
  // get logged-in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user) return [];

  // fetch products belonging to the user
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("uid", user.id) // IMPORTANT: your column must be user_id
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single(); // ensures one result

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
