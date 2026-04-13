import supabase from "../lib/supabaseClients";
import { generateUniqueSlug } from "../utility/slug";

// Sign up function
export async function signUp({
  fullName,
  email,
  password,
  phone,
  storeName,
  whatsapp,
  category,
  state,
  localGovernment,
  role,
  nin,
}) {
  // 🔹 1. Create auth user first
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        phone,
      },
    },
  });

  if (error) throw new Error(error.message);

  const user = data.user;

  if (!user) {
    console.log("User not returned from auth signup");
    return;
  }

  console.log(user);

  // 🔥 2. Generate slug AFTER we have user.id
  let slug = null;

  if (role === "vendor") {
    slug = generateUniqueSlug(storeName, user.id);
  }

  // 🔹 3. Insert into users table
  const { error: insertError } = await supabase.from("users").insert([
    {
      uid: user.id,
      email,
      fullName,
      storeName,
      whatsapp,
      category,
      state,
      localGovernment,
      phone,
      role,
      nin,
      slug, // ✅ correct
    },
  ]);

  if (insertError) {
    console.error("Database insert error:", insertError);
    return;
  }

  console.log("User registered and saved successfully");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  return data?.user;
}

// Login function
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);

  return { data, error };
}

// Logout function
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
