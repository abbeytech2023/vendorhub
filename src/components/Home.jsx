import { FaWhatsapp, FaStore, FaUsers, FaTruck } from "react-icons/fa";
import ProductsSection from "./ProductsSection";
import Footer from "./Footer";
import Features from "./Features";

export default function Home() {
  return (
    <>
      <div>
        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-5xl font-bold leading-tight">
                Welcome to <span className="text-yellow-300">VendorHub</span>
              </h1>

              <p className="mt-5 text-lg text-green-100">
                Discover trusted vendors and order products instantly through
                WhatsApp. VendorHub connects buyers directly to sellers across
                Nigeria.
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold">
                  Browse Products
                </button>

                <button className="flex items-center gap-2 bg-black px-6 py-3 rounded-xl">
                  <FaWhatsapp />
                  Order via WhatsApp
                </button>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
                className="rounded-2xl shadow-xl"
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
