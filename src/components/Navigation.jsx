import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import { useUserProfileTable } from "../hooks/useUser";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const { getCartCount } = useCartContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { data, refetch } = useUserProfileTable();

  const count = getCartCount();
  const vendor = data?.role === "vendor";

  const navItemDesktop = "px-2 py-1 hover:text-green-600 transition";

  const navItemMobile =
    "px-4 py-2 rounded-lg border border-gray-200 bg-gray-50";

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow duration-300 ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          VendorHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navItemDesktop}>
            Home
          </Link>

          <Link to="/shop" className={navItemDesktop}>
            Shop
          </Link>

          <Link to="/vendors" className={navItemDesktop}>
            Vendors
          </Link>

          <Link to="/about" className={navItemDesktop}>
            About Us
          </Link>

          {user && vendor && (
            <Link to="/seller-admin" className={navItemDesktop}>
              Admin
            </Link>
          )}

          {!user && (
            <Link to="/sell" className={navItemDesktop}>
              Become a Vendor
            </Link>
          )}

          {!user && (
            <Link to="/login" className={navItemDesktop}>
              Login
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="hover:text-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-green-600 transition">
            <FaShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* WhatsApp Button */}
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <FaWhatsapp />
            Order
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col p-6 gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navItemMobile}
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className={navItemMobile}
            >
              Shop
            </Link>

            <Link
              to="/vendors"
              onClick={() => setMenuOpen(false)}
              className={navItemMobile}
            >
              Vendors
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={navItemMobile}
            >
              About Us
            </Link>

            {user && vendor && (
              <Link
                to="/seller-admin"
                onClick={() => setMenuOpen(false)}
                className={navItemMobile}
              >
                Admin
              </Link>
            )}

            {!user && (
              <Link
                to="/sell"
                onClick={() => setMenuOpen(false)}
                className={navItemMobile}
              >
                Become a Vendor
              </Link>
            )}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={`${navItemMobile} flex items-center justify-between relative`}
            >
              Cart
              {count > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {!user && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={navItemMobile}
              >
                Login
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}

            <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
              <FaWhatsapp />
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
