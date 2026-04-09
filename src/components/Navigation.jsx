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

  // 🔥 Styles
  const navItemDesktop = "px-2 py-1 hover:text-green-600 transition";

  const navItemMobile =
    "px-4 py-2 rounded-lg border border-gray-200 bg-gray-50";

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  refetch();

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 bg-white ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          VendorHub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/shop" className={navItemDesktop}>
            Shop
          </Link>

          <Link to="/vendors" className={navItemDesktop}>
            Vendors
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
          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* WhatsApp */}
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <FaWhatsapp />
            Order
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-6 gap-2">
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
              className={`${navItemMobile} relative flex justify-between`}
            >
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                className="px-4 py-2 cursor-pointer rounded-lg border text-white  border-red-800 bg-red-800"
              >
                Logout
              </button>
            )}

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
