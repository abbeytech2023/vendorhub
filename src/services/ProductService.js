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

/**
 * Update a row in a Supabase table
 */
export async function updateRow({ table, id, updates }) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProduct(product) {
  console.log(product);

  if (!product) throw new Error("Product is required");

  const { id, image } = product;

  console.log(image);

  // 1. Delete image from storage (if exists)
  if (image) {
    const fileName = image.split("/").pop(); // extract file name

    console.log(fileName);

    const { error: storageError } = await supabase.storage
      .from("product-image") // your bucket name
      .remove([fileName]);

    if (storageError) {
      console.error("Storage delete error:", storageError.message);
      console.log(storageError.message);

      throw new Error("Failed to delete product image");
    }
  }

  // 2. Delete product from database
  const { error: dbError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("DB delete error:", dbError.message);
    throw new Error("Failed to delete product");
  }

  return true;
}
