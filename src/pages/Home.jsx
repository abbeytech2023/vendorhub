import { FaWhatsapp } from "react-icons/fa";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import Features from "../components/Features";
import { useVendor } from "../hooks/useVendors";
import ProfileCompletionChecker from "../components/ProfileCompletion";
import { useUserProfileTable } from "../hooks/useUser";

export default function Home() {
  const { data: user } = useUserProfileTable();
  const id = user?.id;
  const { vendor } = useVendor(id);

  console.log(vendor);

  return (
    <>
      <div className="space-y-4">
        {/* 🔥 PROFILE COMPLETION CHECKER (NEW) */}
        {vendor && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
            <ProfileCompletionChecker vendor={vendor} />
          </div>
        )}

        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-10">
            {/* TEXT */}
            <div className="text-center mt-8 md:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to <span className="text-yellow-300">VendorHub</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base lg:text-lg text-green-100">
                Discover trusted vendors and order products instantly through
                WhatsApp. VendorHub connects buyers directly to sellers across
                Nigeria.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
                <button className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold w-full sm:w-auto">
                  Browse Products
                </button>

                <button className="flex items-center justify-center gap-2 bg-black px-6 py-3 rounded-xl w-full sm:w-auto">
                  <FaWhatsapp />
                  Order via WhatsApp
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
                className="rounded-2xl shadow-xl w-full max-w-md md:max-w-full object-cover"
                alt="shopping"
              />
            </div>
          </div>
        </section>

        <ProductsSection />
        <Features />
        <Footer />
      </div>
    </>
  );
}
