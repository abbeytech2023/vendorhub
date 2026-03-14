import { FaWhatsapp, FaTrash } from "react-icons/fa";

export default function CartSection({
  vendorCarts,
  generateWhatsappLink,
  removeFromCart,
  formatPrice,
  addToCart,
}) {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center">Your Cart</h2>

      {vendorCarts.map((vendorCart) => {
        const total = vendorCart.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );

        return (
          <div
            key={vendorCart.whatsapp}
            className="mb-8 bg-white rounded-2xl shadow p-6"
          >
            {/* Vendor Name */}
            <h3 className="text-xl text-center font-semibold mb-6 text-green-600">
              {vendorCart.vendor}
            </h3>

            {/* Items */}
            <div className="space-y-4">
              {vendorCart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Control */}
                    <div className="flex items-center justify-center sm:justify-start mt-2 gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="px-3 text-lg font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="font-semibold text-center sm:text-left">
                    {formatPrice(item.price * item.qty)}
                  </div>

                  {/* Remove */}
                  {/* <button
                    onClick={() => removeFromCart(vendorCart.whatsapp, item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button> */}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <span className="font-bold text-lg">
                Total: {formatPrice(total)}
              </span>

              <a
                href={generateWhatsappLink(vendorCart)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                <FaWhatsapp />
                Checkout on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </section>
  );
}
