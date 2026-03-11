import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  const [cart, setCart] = useState([]);

  // Example products (10+)
  const products = [
    {
      id: 1,
      name: "Laptop",
      vendor: "Abbey Electronics",
      price: 200000,
      whatsapp: "+2348012345678",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Headphones",
      vendor: "Abbey Electronics",
      price: 15000,
      whatsapp: "+2348012345678",
      image:
        "https://images.unsplash.com/photo-1580894732444-3aa3b0a16e0b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "T-Shirt",
      vendor: "Fashion Hub",
      price: 5000,
      whatsapp: "+2348098765432",
      image:
        "https://images.unsplash.com/photo-1618354691740-2d7f19eb04e7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Sneakers",
      vendor: "Fashion Hub",
      price: 25000,
      whatsapp: "+2348098765432",
      image:
        "https://images.unsplash.com/photo-1612817153134-2a1c1b0c1f18?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Smartphone",
      vendor: "Mobile World",
      price: 120000,
      whatsapp: "+2348023456789",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Tablet",
      vendor: "Mobile World",
      price: 80000,
      whatsapp: "+2348023456789",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      name: "Handbag",
      vendor: "Fashion Fiesta",
      price: 12000,
      whatsapp: "+2348034567890",
      image:
        "https://images.unsplash.com/photo-1562158076-5ca8d99f3e3b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      name: "Watch",
      vendor: "Fashion Fiesta",
      price: 25000,
      whatsapp: "+2348034567890",
      image:
        "https://images.unsplash.com/photo-1580910051072-0c6cc7d4f932?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 9,
      name: "Gaming Mouse",
      vendor: "Gadget Arena",
      price: 10000,
      whatsapp: "+2348045678901",
      image:
        "https://images.unsplash.com/photo-1587202372775-1e80da437f08?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 10,
      name: "Keyboard",
      vendor: "Gadget Arena",
      price: 15000,
      whatsapp: "+2348045678901",
      image:
        "https://images.unsplash.com/photo-1587202372022-7d8a50b0b99c?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart:", [...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="py-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <span className="text-gray-600 font-medium">
            Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
