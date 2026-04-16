export function slugify(text) {
  if (!text) return "";

  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // replace accents (e.g. café → cafe)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // remove invalid characters
      .replace(/[^a-z0-9\s-]/g, "")
      // replace spaces and multiple hyphens with single hyphen
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}
