import supabase from "../lib/supabaseClients";

export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export const generateUniqueSlug = async (storeName, id) => {
  const baseSlug = slugify(storeName);

  // get current user

  // shorten uid (clean URL)
  const shortId = id.slice(0, 6);

  return `${baseSlug}-${shortId}`;
};
