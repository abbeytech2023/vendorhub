import { useState } from "react";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      image: form.image || "https://picsum.photos/200",
    };

    setProducts([newProduct, ...products]);

    setForm({
      name: "",
      price: "",
      image: "",
    });
  };

  const deleteProduct = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
  };

  return (
    <section className="max-w-6xl mx-auto p-6 mt-12">
      {/* Seller Info */}
      <div className="bg-white shadow p-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold mb-4">{seller.name} Dashboard</h1>

        <p>
          <strong>Bank:</strong> {seller.bank}
        </p>
        <p>
          <strong>Account Name:</strong> {seller.accountName}
        </p>
        <p>
          <strong>Account Number:</strong> {seller.accountNumber}
        </p>
      </div>

      {/* Add Product Form */}
      <div className="bg-white shadow p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={addProduct} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>

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
