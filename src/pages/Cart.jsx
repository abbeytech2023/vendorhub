import { useCartContext } from "../hooks/useCartContext";
import CartSection from "../components/CartSection";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useCartContext();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  // ✅ Format WhatsApp number correctly
  const formatWhatsappNumber = (number) => {
    if (!number) return "";

    const clean = number.replace(/\D/g, "");

    if (clean.startsWith("0")) {
      return "234" + clean.slice(1);
    }

    if (clean.startsWith("234")) {
      return clean;
    }

    return clean;
  };

  // Convert cart object to array for mapping
  const vendorCarts = Object.values(cart);

  if (vendorCarts.length === 0) {
    return (
      <section className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </section>
    );
  }

  const generateWhatsappLink = (vendorCart) => {
    let message = `Hello ${vendorCart.vendor}, I want to order:\n\n`;

    vendorCart.items.forEach((item) => {
      message += `${item.qty} x ${item.name} - ${formatPrice(item.price)}\n`;
    });

    const total = vendorCart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );

    message += `\nTotal: ${formatPrice(total)}\nOrder from VendorHub`;

    // ✅ FIXED NUMBER HERE
    const phone = formatWhatsappNumber(vendorCart.whatsapp);

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartSection
      removeFromCart={removeFromCart}
      generateWhatsappLink={generateWhatsappLink}
      formatPrice={formatPrice}
      addToCart={addToCart}
      vendorCarts={vendorCarts}
    />
  );
}
