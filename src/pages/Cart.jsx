import CartSection from "../components/CartSection";
import GoBackButton from "../components/GoBackButton";
import { useCartContext } from "../hooks/useCartContext";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useCartContext();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const formatWhatsappNumber = (number) => {
    if (!number) return "";

    const clean = number.replace(/\D/g, "");

    if (clean.startsWith("0")) return "234" + clean.slice(1);
    if (clean.startsWith("234")) return clean;

    return clean;
  };

  const vendorCarts = Object.values(cart);
  console.log(vendorCarts);

  const generateWhatsappLink = (vendorCart) => {
    let message = `Hello ${vendorCart}, I want to order:\n\n`;

    vendorCart.items.forEach((item) => {
      message += `${item.qty} x ${item.name} - ${formatPrice(item.price)}\n`;
    });

    const total = vendorCart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );

    message += `\nTotal: ${formatPrice(total)}\nOrder from VendorHub`;

    const phone = formatWhatsappNumber(vendorCart.whatsapp);

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // ================= EMPTY STATE =================
  if (vendorCarts.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-3">Your Cart 🛒</h2>
        <p className="text-gray-500 mb-6">You haven’t added anything yet</p>

        <GoBackButton label="Continue Shopping" />
      </section>
    );
  }

  // ================= CART PAGE =================
  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* HEADER */}
      <div className="max-w-7xl text-black mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <GoBackButton />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Cart
        </h1>
        <div className="w-24" /> {/* spacer for balance */}
      </div>

      {/* CART CONTENT */}
      <div className="pb-10">
        <CartSection
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          vendorCarts={vendorCarts}
          generateWhatsappLink={generateWhatsappLink}
          formatPrice={formatPrice}
        />
      </div>
    </div>
  );
}
