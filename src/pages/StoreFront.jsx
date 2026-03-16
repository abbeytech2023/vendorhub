import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { vendors } from "../hooks/useVendors";
import { products } from "../hooks/useProduct";
import VendorProfile from "../components/VendorProfile";

export default function StoreFront() {
  const { id } = useParams();

  const paramId = parseInt(id, 10);

  // find vendor
  const vendor = vendors.find((v) => v.id === paramId);

  console.log(vendor);

  // get products for this vendor
  //   const vendorProducts = products.filter(
  //     (product) => product.vendorId === paramId,
  //   );

  if (!vendor) {
    return <p className="text-center mt-30 text-gray-500">Store not found</p>;
  }

  return (
    <section className="max-w-6xl mx-auto p-6 mt-10">
      {/* Vendor Info */}
      {/* <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">{vendor.name}</h1>

        <a
          href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          <FaWhatsapp />
          Chat Seller
        </a>
      </div> */}

      <VendorProfile />

      {/* Products */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>

            <p className="text-gray-500">₦{product.price}</p>

            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
