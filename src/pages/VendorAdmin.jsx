import { useState, useEffect } from "react";
import AddProductForm from "../components/AddProductForm";
import VendorProfile from "../components/VendorProfile";
import ProductGrid from "../components/AdminProduct";
import AddProduct12 from "../components/AddProducts12";

export default function VendorAdmin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  return (
    <section className="max-w-6xl mx-auto p-6 mt-12">
      {/* Seller Info */}
      <div className="bg-white shadow p-6 rounded-xl mb-8">
        <VendorProfile />
      </div>

      {/* <AddProductForm /> */}
      <AddProduct12 />

      {/* Product List */}
      <div>
        <ProductGrid />
      </div>
    </section>
  );
}
