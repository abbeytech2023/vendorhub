import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import AddProduct12 from "../components/AddProducts12";
import VendorProfile from "../components/VendorProfile";
import ProductGrid from "../components/AdminProductList";
import { useVendor } from "../hooks/useVendors";
import { useUserProfileTable } from "../hooks/useUser";
import Spinner from "../components/Spinner";
import { checkProfileComplete } from "../utility/profileComplete";
import toast from "react-hot-toast";

export default function VendorAdmin() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const { data: user } = useUserProfileTable();

  const id = user?.slug;

  console.log(user);

  const { vendor, loading: vendorLoading } = useVendor(id);

  const { isComplete, missingFields } = checkProfileComplete(vendor);

  const handleToggleForm = () => {
    if (!isComplete) {
      toast("Please complete your profile first before adding products.");
      return;
    }

    setShowAddProduct((prev) => !prev);
  };

  return (
    <>
      {vendorLoading && <Spinner />}

      {vendor && (
        <section className="relative min-h-screen mt-20 text-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

          <div className="relative max-w-6xl mx-auto space-y-6 sm:space-y-8">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-100">
                {vendor?.storeName
                  ? `${vendor.storeName} Dashboard`
                  : "Loading..."}
              </h1>

              <p className="text-xs sm:text-sm text-gray-400">
                Manage your store
              </p>
            </div>

            {/* PROFILE */}
            <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <VendorProfile vendor={vendor} />
            </div>

            {/* ADD PRODUCT */}
            <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* TITLE + WARNING */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Add Product
                </h2>

                <button
                  onClick={handleToggleForm}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isComplete
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {showAddProduct ? <FaMinus /> : <FaPlus />}
                  {showAddProduct ? "Close Form" : "Open Form"}
                </button>
              </div>

              {/* ❗ MISSING FIELDS WARNING */}
              {!isComplete && (
                <div className="text-yellow-400 text-sm mb-3 space-y-1">
                  <p>
                    ⚠️ Profile incomplete —{" "}
                    <span className="font-bold">{missingFields.length}</span>{" "}
                    field{missingFields.length > 1 ? "s" : ""} missing.
                  </p>

                  <p className="text-gray-300 text-xs">
                    Complete your profile before you can add products.
                  </p>
                </div>
              )}

              {/* FORM */}
              {showAddProduct && isComplete && (
                <div className="mt-4">
                  <AddProduct12 />
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <ProductGrid />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
