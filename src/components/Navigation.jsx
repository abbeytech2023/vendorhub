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
  const { data, isLoading, error } = useUserProfileTable();

  const count = getCartCount();

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
          {user && (
            <Link to="/seller-admin" className="hover:text-green-600">
              Admin
            </Link>
          )}

          {!user && (
            <Link to="sell" className="hover:text-green-600">
              Become a Vendor
            </Link>
          )}
          {!user && (
            <Link to="/login" className="hover:text-green-600">
              Login
            </Link>
          )}
          {user && (
            <button
              onClick={() => logout()}
              className="hover:text-red-600 cursor-pointer"
            >
              Logout
            </button>
          )}

          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} />

            {/* Badge */}
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
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

            {user && (
              <Link to="/seller-admin" onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            )}

            {!user && (
              <Link to="/sell" onClick={() => setMenuOpen(false)}>
                Become a Vendor
              </Link>
            )}
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center"
            >
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </Link>
            {!user && (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-700 py-2 text-white rounded-lg hover:bg-red-900 cursor-pointer"
              >
                Logout
              </button>
            )}
            <button className="flex items-center cursor-pointer justify-center gap-2 bg-green-500 text-white py-2 rounded-lg">
              <FaWhatsapp />
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
