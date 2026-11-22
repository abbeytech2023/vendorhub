import supabase from "../lib/supabaseClients";
export async function getRealEstateAgents() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("category", "real-estate");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch real estate agents");
  }

  return data;
}
