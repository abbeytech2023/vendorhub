import { Link, useParams } from "react-router-dom";
import VendorProfile from "../components/VendorProfile";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { priceFormat } from "../utility/priceFormat";
import { useVendor } from "../hooks/useVendors";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/useFecthProducts";
import MiniLoader from "../components/MiniLoader";

export default function StoreFront() {
  const { products, isLoading } = useAllProducts();

  const { id } = useParams();
  console.log(id);

  const { addToCart } = useCartContext();
  // const paramId = parseInt(id, 10);
  const { vendor, loading } = useVendor(id);
  console.log(vendor);

  const vendorProducts = products?.filter((prd) => prd?.uid === vendor?.uid);

  return (
    <section className="bg-green-100 min-h-screen py-10 px-4">
      {loading ? (
        <Spinner />
      ) : !vendor ? (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-4xl">🏪</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Vendor Not Found
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
              The vendor you are looking for does not exist, may have been
              removed, or the link may be incorrect.
            </p>

            <Link
              to="/vendors"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto rounded-2xl shadow-md overflow-hidden">
          {/* STORE HEADER */}
          <VendorProfile
            vendor={vendor}
            showEditButton={false}
            showPageUrlButton={true}
            background="bg-transparent"
            cardBg="bg-green-900"
          />

          {/* PRODUCTS SECTION */}
          <div className="px-6 mt-21 pb-8">
            <div className="flex items-center justify-between mb-6 border-t pt-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Products
              </h2>

              <span className="text-sm text-gray-500">
                {vendorProducts?.length || 0} items
              </span>
            </div>

            {isLoading ? (
              <Spinner />
            ) : vendorProducts?.length === 0 ? (
              <p className="text-gray-600">
                This vendor is yet to add a product
              </p>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">
                {vendorProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                  >
                    <Link to={`/details/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />

                      <div className="p-3 space-y-1">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="text-green-600 font-medium">
                          {priceFormat(product.price)}
                        </p>
                      </div>
                    </Link>

                    <div className="p-3 pt-0">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success("Added To Cart");
                        }}
                        className="w-full text-sm bg-green-600 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
