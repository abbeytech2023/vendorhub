import {
  CheckCircle,
  Shield,
  Store,
  Users,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function AboutVendorHub() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold mb-6">
              About VendorHub
            </span>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              The Marketplace Helping Vendors Sell Smarter
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              VendorHub helps vendors create online stores, upload products,
              share their business links, and reach more customers.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition">
                Join as Vendor
              </button>

              <button className="border border-green-200 text-green-700 px-6 py-3 rounded-2xl font-semibold hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1769843021371-014f57a1c79b?w=500&auto=format&fit=crop&q=60"
              alt="Black entrepreneurs"
              className="rounded-[2rem] w-full h-[450px] object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Vendors Choose VendorHub
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We make it easier for businesses to get discovered, build trust,
              and grow online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition">
              <Store className="text-green-600 mb-5" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Storefronts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every vendor gets a beautiful online store page.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition">
              <Users className="text-green-600 mb-5" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                More Customers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Reach more buyers through product discovery and sharing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition">
              <Shield className="text-green-600 mb-5" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Platform
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vendor verification and ratings help build trust.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition">
              <BadgeCheck className="text-green-600 mb-5" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verified Vendors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Verified badges help serious vendors stand out.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[2rem] shadow-lg border border-green-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="Black business owner"
            className="w-full h-full object-cover min-h-[400px]"
          />

          <div className="p-10 lg:p-14">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Mission
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Helping Businesses Move Beyond Social Media
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Many vendors rely only on WhatsApp and Instagram. VendorHub gives
              them a better way to showcase products, organize their store, and
              reach more customers.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={22} />
                <p className="text-gray-700">Easy product uploads</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={22} />
                <p className="text-gray-700">Store sharing links</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={22} />
                <p className="text-gray-700">Customer trust and reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-600 rounded-[2rem] p-10 md:p-16 text-center text-white">
          <h2 className="text-4xl font-bold mb-5">
            Ready to Grow Your Business?
          </h2>

          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
            Join VendorHub today and start building your online store, reaching
            more customers, and growing your business.
          </p>

          <button className="bg-white text-green-700 px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition">
            Join VendorHub
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Footer credit / small ad */}
        <div className="text-center pt-10 border-t border-green-100">
          <p className="text-sm text-gray-500">
            VendorHub is built by{" "}
            <span className="font-semibold text-green-700">
              Web Bridge Solutions
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
