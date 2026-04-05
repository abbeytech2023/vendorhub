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
            {/* Vendor Name */}
            <h3 className="text-2xl font-bold text-center text-green-600 mb-8">
              {vendorCart.vendor}
            </h3>

            {/* Items */}
            <div className="space-y-6">
              {vendorCart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 last:border-b-0"
                >
                  {/* Product Image (BIGGER + RESPONSIVE) */}
                  <div className="w-full sm:w-40 flex justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-40 h-40 sm:w-36 sm:h-36 object-cover rounded-2xl shadow-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h4 className="text-lg font-semibold">{item.name}</h4>

                    <p className="text-gray-500">{formatPrice(item.price)}</p>

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

                  {/* Subtotal */}
                  <div className="text-lg font-bold text-gray-800">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 pt-6 border-t">
              <span className="text-xl font-bold">
                Total: {formatPrice(total)}
              </span>

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
