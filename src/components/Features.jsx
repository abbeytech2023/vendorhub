import { FaWhatsapp, FaStore, FaUsers, FaTruck } from "react-icons/fa";

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Use VendorHub
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaStore size={40} className="mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold text-lg">Multiple Vendors</h3>
            <p className="text-gray-600 mt-2">
              Shop from thousands of trusted vendors on VendorHub.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaWhatsapp size={40} className="mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold text-lg">WhatsApp Checkout</h3>
            <p className="text-gray-600 mt-2">
              Order instantly through WhatsApp without complicated checkout.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaTruck size={40} className="mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">
              Vendors deliver directly to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
