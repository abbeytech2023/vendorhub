export const descriptionSuggestions = (form) => {
  const { name, category, price } = form;

  return [
    `Upgrade your experience with ${name || "this product"}, a top-quality item in the ${category || "general"} category. Built for durability and performance at just ₦${price || 0}.`,

    `The ${name || "product"} is a must-have in the ${category || "general"} collection. Designed for reliability, style, and everyday use.`,

    `Experience premium quality with ${name || "this product"}. A perfect blend of functionality and modern design.`,

    `Looking for value? ${name || "This product"} delivers performance and affordability at ₦${price || 0}.`,

    `${name || "This item"} stands out in the ${category || "general"} category with its durability and sleek design.`,
  ];
};
