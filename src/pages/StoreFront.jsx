import { Link, useParams } from "react-router-dom";
import { vendors } from "../hooks/useVendors";
import { products } from "../hooks/useProduct";
import VendorProfile from "../components/VendorProfile";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";

export default function StoreFront() {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const paramId = parseInt(id, 10);

  const vendor = vendors.find((v) => v.id === paramId);

  if (!vendor) {
    return <p className="text-center mt-20 text-gray-500">Store not found</p>;
  }

  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Store Header */}
        <VendorProfile />

        {/* Products Section */}
        <div className="p-6 ">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className=" rounded-xl p-4 hover:shadow-md transition"
              >
                <Link to={`/details/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />

                  <h3 className="text-lg font-semibold mt-3">{product.name}</h3>

                  <p className="text-gray-500">₦{product.price}</p>
                </Link>

                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added To Cart");
                  }}
                  className="mt-3 w-full cursor-pointer  bg-green-600 text-white py-2 rounded-lg hover:bg-green-800"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
