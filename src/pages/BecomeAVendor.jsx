import { FaStore, FaUsers, FaChartLine, FaWhatsapp } from "react-icons/fa";

export default function BecomeVendor() {
  const message = encodeURIComponent(
    "Hello, I want to become a vendor on VendorHub.",
  );

  return (
    <section className="bg-green-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">Sell on VendorHub</h2>

          <p className="mt-4 text-green-100">
            Reach thousands of customers and grow your business with VendorHub.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow text-center">
            <FaStore className="text-green-600 mx-auto mb-4" size={40} />
            <h3 className="font-semibold text-lg">Create Your Store</h3>
            <p className="text-gray-600 mt-2">
              Set up your online store and start listing products easily.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-xl shadow text-center">
            <FaUsers className="text-green-600 mx-auto mb-4" size={40} />
            <h3 className="font-semibold text-lg">Reach More Customers</h3>
            <p className="text-gray-600 mt-2">
              VendorHub connects you with thousands of buyers.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-xl shadow text-center">
            <FaChartLine className="text-green-600 mx-auto mb-4" size={40} />
            <h3 className="font-semibold text-lg">Grow Your Business</h3>
            <p className="text-gray-600 mt-2">
              Manage your products, orders, and sales in one place.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`https://wa.me/2349134813002?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaWhatsapp size={20} />
            Become a Vendor
          </a>
        </div>
      </div>
    </section>
  );
}
