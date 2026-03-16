import { useParams } from "react-router-dom";
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function VendorProfile() {
  const { id } = useParams();

  const sellers = [
    {
      id: 1,
      name: "Abbey Electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      location: "Ikeja, Lagos",
      phone: "+2348162010121",
      whatsapp: "+2348162010121",
      description:
        "We sell original smartphones, laptops and electronics at affordable prices.",
    },
    {
      id: 2,
      name: "Fashion Hub",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      location: "Yaba, Lagos",
      phone: "+2348098765432",
      whatsapp: "+2348098765432",
      description:
        "Trendy fashion store for sneakers, shirts, and casual outfits.",
    },
    {
      id: 3,
      name: "Tech World",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      location: "Computer Village, Lagos",
      phone: "+2347012345678",
      whatsapp: "+2347012345678",
      description: "Your trusted shop for laptops, gadgets and accessories.",
    },
  ];

  const seller = sellers.find((s) => s.id === Number(id));

  if (!seller) {
    return <p className="text-center mt-10 text-gray-500">Seller not found</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Profile Image */}
        <img
          src={seller.image}
          alt={seller.name}
          className="w-32 h-32 rounded-full object-cover border"
        />

        {/* Seller Details */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-3xl font-bold">{seller.name}</h1>

          <p className="flex items-center gap-2 text-gray-500 justify-center md:justify-start">
            <FaMapMarkerAlt />
            {seller.location}
          </p>

          <p className="flex items-center gap-2 text-gray-500 justify-center md:justify-start">
            <FaPhone />
            {seller.phone}
          </p>

          <p className="text-gray-600 mt-2">{seller.description}</p>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${seller.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
