import supabase from "../lib/supabaseClients";

export async function createReview(review_data) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([review_data])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getVendorReviews(user_id) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("vendor_id", user_id)
    // .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
