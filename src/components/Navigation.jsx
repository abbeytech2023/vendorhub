import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  // Add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 bg-white transition-shadow ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          VendorHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/shop" className="hover:text-green-600">
            Shop
          </Link>
          <Link to="/vendors" className="hover:text-green-600">
            Vendors
          </Link>

          <Link to="sell" className="hover:text-green-600">
            Become a Vendor
          </Link>
          <Link to="/login" className="hover:text-green-600">
            Login
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} />
          </Link>
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">
            <FaWhatsapp />
            Order
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-6 gap-4">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>

            <Link to="/vendors" onClick={() => setMenuOpen(false)}>
              Vendors
            </Link>

            <Link to="/sell" onClick={() => setMenuOpen(false)}>
              Become a Vendor
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg">
              <FaWhatsapp />
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
