import CartSection from "../components/CartSection";
import GoBackButton from "../components/GoBackButton";
import { useCartContext } from "../hooks/useCartContext";
import { generateWhatsappLink } from "../utility/generateWhatsAppLink";

export default function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useCartContext();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const vendorCarts = Object.values(cart);

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (confirmClear) {
      clearCart();
    }
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

        {/* CLEAR CART BUTTON */}
        <button
          onClick={handleClearCart}
          disabled={vendorCarts.length === 0}
          className={`px-4 py-2 rounded-lg cursopo text-sm font-medium transition ${
            vendorCarts.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Clear Cart
        </button>
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
