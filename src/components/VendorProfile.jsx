import { useParams } from "react-router-dom";
import { vendors } from "../hooks/useVendors";
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function VendorProfile() {
  const { id } = useParams();

  const vendor = vendors.find((s) => s.id === Number(id));

  if (!vendor) {
    return <p className="text-center mt-10 text-gray-500">Seller not found</p>;
  }

  return (
    <section className="bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Store Banner */}
        <div className="h-36 bg-gradient-to-r from-gray-900 to-gray-700"></div>

        {/* Store Header */}
        <div className="px-6 pb-6 -mt-14 border-b">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Logo */}
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
            />

            {/* Store Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{vendor.name}</h1>

              <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {vendor.location}
                </span>

                <span className="flex items-center gap-2">
                  <FaPhone />
                  {vendor.whatsapp}
                </span>

                <span>{vendor.category}</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaWhatsapp />
              Chat
            </a>
          </div>
        </div>

        {/* Products Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Products from {vendor.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product cards will render here */}
          </div>
        </div>
      </div>
    </section>
  );
}
