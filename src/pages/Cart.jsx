import { FaWhatsapp, FaTrash } from "react-icons/fa";
import { useCartContext } from "../hooks/useCartContext";
export default function Cart() {
  const { cart, removeFromCart } = useCartContext();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

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

    return `https://wa.me/${vendorCart.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      message,
    )}`;
  };

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
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">
              {vendorCart.vendor}
            </h3>

            <table className="w-full mb-6">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Price</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {vendorCart.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3 text-center">{item.qty}</td>
                    <td className="py-3">{formatPrice(item.price)}</td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() =>
                          removeFromCart(vendorCart.whatsapp, item.id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center">
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
