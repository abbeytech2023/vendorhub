import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../hooks/useCartContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCartContext();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const vendorCarts = Object.values(cart);

  if (vendorCarts.length === 0) {
    return (
      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Your Cart</h2>

      {vendorCarts.map((vendorCart) => {
        const total = vendorCart.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );

        return (
          <div
            key={vendorCart.whatsapp}
            className="mb-8 bg-white rounded-xl shadow-md p-4"
          >
            {/* Vendor Name */}
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">
              {vendorCart.vendor}
            </h3>

            {/* Products */}
            <div className="flex flex-col gap-4">
              {vendorCart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b py-3"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 sm:h-24 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-500">{formatPrice(item.price)}</p>

                    {/* Quantity Controls */}
                    <div className="flex justify-center sm:justify-start items-center mt-2 gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  {/* <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                  >
                    <FaTrash size={20} />
                  </button> */}
                </div>
              ))}
            </div>

            {/* Vendor Total */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <span className="font-bold text-lg">
                Total: {formatPrice(total)}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
