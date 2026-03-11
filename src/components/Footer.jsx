import React from "react";

export default function Footer() {
  return (
    <section className="py-20 bg-green-600 text-white text-center">
      <h2 className="text-4xl font-bold">Are You a Seller?</h2>

      <p className="mt-4 text-green-100">
        Join VendorHub and start selling to thousands of customers today.
      </p>

      <button className="mt-6 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold">
        Become a Vendor
      </button>
    </section>
  );
}
