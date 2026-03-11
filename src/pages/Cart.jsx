import { FaWhatsapp, FaTrash } from "react-icons/fa";

export default function Cart() {
  const cart = [
    {
      vendor: "Abbey Electronics",
      whatsapp: "+2348162010121",
      items: [
        {
          id: 1,
          name: "Laptop",
          qty: 1,
          price: 200000,
          description: "High-performance gaming laptop with 16GB RAM",
        },
        {
          id: 2,
          name: "Headphones",
          qty: 2,
          price: 15000,
          description: "Noise-cancelling over-ear headphones",
        },
      ],
    },
    {
      vendor: "Fashion Hub",
      whatsapp: "+2348098765432",
      items: [
        {
          id: 3,
          name: "T-Shirt",
          qty: 3,
          price: 5000,
          description: "100% cotton, comfortable fit",
        },
        {
          id: 4,
          name: "Sneakers",
          qty: 1,
          price: 25000,
          description: "Stylish sneakers with rubber sole",
        },
      ],
    },
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const generateWhatsappLink = (vendorCart) => {
    let message = `Hello ${vendorCart.vendor}, I want to order:\n`;
    vendorCart.items.forEach((item) => {
      message += `${item.qty} x ${item.name} x ${item.description} - ${formatPrice(item.price)}\n `;
    });
    return `https://wa.me/${vendorCart.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}\n - This order is from VendorHub`;
  };

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-clip-text text-transparent from-purple-500 via-pink-500 to-red-500">
        Your Cart
      </h2>

      {cart.map((vendorCart, idx) => {
        const total = vendorCart.items.reduce(
          (sum, item) => sum + item.qty * item.price,
          0,
        );

        return (
          <div
            key={idx}
            className="mb-8 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              {vendorCart.vendor}
            </h3>

            <table className="w-full mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-50">
                <tr className="text-left">
                  <th className="py-3 px-4 text-gray-700">Product</th>
                  <th className="py-3 px-4 text-gray-700">Qty</th>
                  <th className="py-3 px-4 text-gray-700">Price</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {vendorCart.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-indigo-50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-500 text-sm">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{item.qty}</td>
                    <td className="py-3 px-4">{formatPrice(item.price)}</td>
                    <td className="py-3 px-4 text-red-500 cursor-pointer hover:text-red-700 flex justify-center">
                      <FaTrash className="hover:scale-110 transition-transform" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <span className="font-semibold text-xl text-gray-800">
                Total: {formatPrice(total)}
              </span>

              <a
                href={generateWhatsappLink(vendorCart)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <FaWhatsapp className="text-xl" />
                Checkout on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </section>
  );
}
