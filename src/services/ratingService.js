import supabase from "../lib/supabaseClients";

export async function getVendorRatings() {
  const { data, error } = await supabase
    .from("reviews")
    .select("vendor_id, rating");

  if (error) throw error;

  const ratings = {};

  data.forEach((review) => {
    const vendor_id = review.vendor_id;

    if (!ratings[vendor_id]) {
      ratings[vendor_id] = {
        total: 0,
        count: 0,
      };
    }

    ratings[vendor_id].total += Number(review.rating);
    ratings[vendor_id].count += 1;
  });

  const averages = {};

  Object.entries(ratings).forEach(([vendor_id, value]) => {
    averages[vendor_id] = {
      average: Number((value.total / value.count).toFixed(1)),
      count: value.count,
    };
  });

  return averages;
}
