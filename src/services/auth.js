import supabase from "../lib/supabaseClients";
import { slugify } from "../utility/slugify";
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

  if (!user) return;

  let slug = null;

  if (role === "vendor") {
    const shortId = user.id.slice(0, 8);
    slug = `${slugify(storeName)}-${shortId}`;
  }

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
      slug,
    },
  ]);

  if (insertError) {
    console.error("Database insert error:", insertError);
    return;
  }

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
