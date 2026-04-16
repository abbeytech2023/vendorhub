import AddProduct12 from "../components/AddProducts12";
import VendorProfile from "../components/VendorProfile";
import ProductGrid from "../components/AdminProductList";
import { useVendor } from "../hooks/useVendors";
import { useUserProfileTable } from "../hooks/useUser";
import Spinner from "../components/Spinner";

export default function VendorAdmin() {
  const { data: user } = useUserProfileTable();
  const id = user?.slug;

  const { vendor, loading: vendorLoading } = useVendor(id);

  return (
    <>
      {vendorLoading && <Spinner />}

      {vendor && (
        <section className="relative min-h-screen mt-20 text-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

          <div className="relative max-w-6xl mx-auto space-y-6 sm:space-y-8">
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

            {vendor && (
              <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
                <VendorProfile vendor={vendor} />
              </div>
            )}

            <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <AddProduct12 />
            </div>

            <div className="w-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <ProductGrid />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
