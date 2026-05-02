import { useState } from "react";
import CartSection from "../components/CartSection";
import GoBackButton from "../components/GoBackButton";
import { useCartContext } from "../hooks/useCartContext";
import { generateWhatsappLink } from "../utility/generateWhatsAppLink";

export default function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useCartContext();

  const [showClearModal, setShowClearModal] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const vendorCarts = Object.values(cart);

  // 🔥 OPEN MODAL
  const handleClearCart = () => {
    setShowClearModal(true);
  };

  // 🔥 CONFIRM
  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  // 🔥 CANCEL
  const cancelClearCart = () => {
    setShowClearModal(false);
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
          className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition ${
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

      {/* 🔥 CLEAR CART MODAL */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm space-y-4 text-center shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Clear Cart?</h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to remove all items from your cart?
            </p>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={cancelClearCart}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmClearCart}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
