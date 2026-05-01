import { priceFormat } from "./priceFormat";

const formatWhatsappNumber = (number) => {
  if (!number) return "";

  const clean = number.replace(/\D/g, "");

  if (clean.startsWith("0")) return "234" + clean.slice(1);
  if (clean.startsWith("234")) return clean;

  return clean;
};

export const generateWhatsappLink = (vendorCart) => {
  let message = `Hello ${vendorCart.vendor}, I want to order:\n\n`;

  vendorCart.items.forEach((item) => {
    message += `${item.qty} x ${item.name} - ${priceFormat(item.price)}\n`;
    message += `Link: https://vendorhub.ng/details/${item.id}\n\n`;
  });

  const total = vendorCart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  message += `Total: ${priceFormat(total)}\n`;
  message += `Order from VendorHub`;

  const phone = formatWhatsappNumber(vendorCart.whatsapp);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
