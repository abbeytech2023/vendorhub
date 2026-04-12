import supabase from "../lib/supabaseClients";

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
  console.log(email, password, state, localGovernment);

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
  // console.log(error);

  const user = data.user;
  console.log(user);

  if (!user) {
    console.log("user not returned from auth signup");
    return;
  }

  // insert into the users table
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
    },
  ]);

  if (insertError) {
    console.error("database inserterror:,", insertError);
    return;
  }

  console.log("user registered and saved successfully");

  // console.log(data)

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

export async function checkIfAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  console.log(user.email);

  const isAdmin = user.email === "yogeezyentertainment@gmail.com";
  console.log(isAdmin);

  return isAdmin;
}
