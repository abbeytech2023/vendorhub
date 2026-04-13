import { FaWhatsapp } from "react-icons/fa";

export default function CartSection({
  vendorCarts,
  generateWhatsappLink,
  removeFromCart,
  formatPrice,
  addToCart,
}) {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {vendorCarts.map((vendorCart) => {
        const total = vendorCart.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );

        return (
          <div
            key={vendorCart.whatsapp}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 sm:p-8"
          >
            {/* 🔥 Vendor Header */}
            <div className="flex items-center justify-between mb-8 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-white rounded-2xl border border-green-100 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500 text-white font-bold text-lg shadow-md">
                  {vendorCart.vendor?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {vendorCart.vendor?.charAt(0).toUpperCase() +
                      vendorCart.vendor?.slice(1)}
                  </h3>
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    Verified Vendor
                  </p>
                </div>
              </div>

              <div className="hidden sm:block">
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Store
                </span>
              </div>
            </div>

            {/* 🛒 Items */}
            <div className="space-y-6">
              {vendorCart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b pb-6 last:border-b-0"
                >
                  {/* 📸 Bigger Image */}
                  <div className="w-full sm:w-52 flex justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-48 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-lg"
                    />
                  </div>

                  {/* 📝 Info */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h4>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Price */}
                    <p className="text-lg font-semibold text-gray-700">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-lg"
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold w-6 text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 💰 Subtotal */}
                  <div className="text-xl font-bold text-green-600">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* 💳 Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 pt-6 border-t">
              {/* Total */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-green-700">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <a
                href={generateWhatsappLink(vendorCart)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
              >
                <FaWhatsapp className="text-lg" />
                Checkout on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </section>
  );
}
