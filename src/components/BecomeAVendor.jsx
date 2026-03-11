import { FaStore, FaUsers, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BecomeVendor() {
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
          <Link
            to="/vendor/register"
            className="bg-white text-green-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Become a Vendor
          </Link>
        </div>
      </div>
    </section>
  );
}
