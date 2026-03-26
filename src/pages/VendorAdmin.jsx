import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import VendorProfile from "../components/VendorProfile";

export default function VendorAdmin() {
  const seller = {
    id: 1,
    name: "Abbey Electronics",
    bank: "Access Bank",
    accountName: "Abbey Electronics Ltd",
    accountNumber: "0123456789",
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 13",
      price: 450000,
      image: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: 380000,
      image: "https://picsum.photos/201",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const deleteProduct = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 mt-12">
      {/* Seller Info */}
      <div className="bg-white shadow p-6 rounded-xl mb-8">
        <VendorProfile />
      </div>

      <AddProductForm />

      {/* Product List */}
      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4">Your Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-xl p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />

              <h3 className="mt-2 font-semibold">{product.name}</h3>

              <p className="text-red-600 font-bold">
                ₦{product.price.toLocaleString()}
              </p>

              <button
                onClick={() => deleteProduct(product.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
