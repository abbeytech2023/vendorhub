import AddProduct12 from "../components/AddProducts12";
import VendorProfile from "../components/VendorProfile";
import ProductGrid from "../components/AdminProduct";
import { useVendor } from "../hooks/useVendors";
import { useUserProfileTable } from "../hooks/useUser";
import Spinner from "../components/Spinner";

export default function VendorAdmin() {
  const { data: user } = useUserProfileTable();
  const id = user?.id;

  const { vendor, loading: vendorLoading } = useVendor(id);

  return (
    <>
      {vendorLoading && <Spinner />}
      {vendor && (
        <section className="min-h-screen mt-12 bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            {/* Vendor Profile */}
            <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6">
              <VendorProfile vendor={vendor} />
            </div>

            {/* Add Product Section */}
            <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6">
              <AddProduct12 />
            </div>

            {/* Product Grid */}
            <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6">
              <ProductGrid />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
