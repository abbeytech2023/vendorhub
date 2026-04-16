export const handleGenerateDescription = ({ formData, setSuggestions }) => {
  const base = `${formData.name || "This product"} in the ${
    formData.category || "item"
  } category`;

  setSuggestions([
    `${base}. Crafted with premium materials for durability.`,
    `${base}. A reliable and affordable everyday choice.`,
    `${base}. Designed for performance and long-term use.`,
  ]);
};
