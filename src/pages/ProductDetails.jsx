const handleBuyNow = () => {
  const pageLink = window.location.href;

  // ================= FORMAT PHONE =================
  let vendorPhone = product?.whatsapp || "";

  // remove spaces, +, -, brackets
  vendorPhone = vendorPhone.replace(/\D/g, "");

  // convert 08012345678 -> 2348012345678
  if (vendorPhone.startsWith("0")) {
    vendorPhone = `234${vendorPhone.slice(1)}`;
  }

  // if already starts with 234 leave it
  // example: 2348012345678

  const message = `
Hello, I want to buy this product.

Product Name: ${product.name}
Price: ${priceFormat(product.price)}
Link: ${pageLink}
  `;

  const whatsappUrl = `https://wa.me/${vendorPhone}?text=${encodeURIComponent(
    message,
  )}`;

  window.open(whatsappUrl, "_blank");
};
