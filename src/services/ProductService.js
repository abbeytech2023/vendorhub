import supabase from "../lib/supabaseClients";

// Upload image
export const uploadProductImage = async (file) => {
  if (!file) return "";

  const MAX_FILE_SIZE_KB = 500;

  const compressImage = (file, maxWidth = 1000, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target.result;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image file"));
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const scale = maxWidth / width;
          width = maxWidth;
          height = height * scale;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }

            const compressedFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".jpg"),
              {
                type: "image/jpeg",
              },
            );

            resolve(compressedFile);
          },
          "image/jpeg",
          quality,
        );
      };

      img.onerror = () => {
        reject(new Error("Invalid image file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const compressedFile = await compressImage(file);

  const compressedSizeKB = compressedFile.size / 1024;

  if (compressedSizeKB > MAX_FILE_SIZE_KB) {
    throw new Error(
      `Compressed image is too large. Maximum allowed size is ${MAX_FILE_SIZE_KB}KB`,
    );
  }

  const fileName = `${Date.now()}-${compressedFile.name}`;

  const { error } = await supabase.storage
    .from("product-image")
    .upload(fileName, compressedFile);

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
