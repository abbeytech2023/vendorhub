import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import Features from "../components/Features";
import { useVendor } from "../hooks/useVendors";
import ProfileCompletionChecker from "../components/ProfileCompletion";
import { useUserProfileTable } from "../hooks/useUser";
import ServiceProviders from "./ServiceProvider";
import Hero from "../components/Hero";

export default function Home() {
  const { data: user, error } = useUserProfileTable();
  const id = user?.slug;
  const { vendor } = useVendor(id);

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
        <Hero />
        <ProductsSection />
        <ServiceProviders />
        <Features />
        <Footer />
      </div>
    </>
  );
}
