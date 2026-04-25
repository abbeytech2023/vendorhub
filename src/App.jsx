import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import BecomeVendor from "./pages/BecomeAVendor";
import VendorRegistration from "./pages/VendorRegistration";
import SuperAdminDashboard from "./components/SuperAdmin";
import VendorsSectionPage from "./components/VendorGrid";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductListPage from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import StoreFront from "./pages/StoreFront";
import VendorAdmin from "./pages/VendorAdmin";
import Login from "./pages/Login";
import InstallButton from "./components/InstallButton";
import Spinner from "./components/Spinner";
import AboutVendorHub from "./pages/AboutUs";

import { useAuthContext } from "./hooks/useAuthContext";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const { authIsReady } = useAuthContext();

  return (
    <>
      {!authIsReady && <Spinner />}

      {authIsReady && (
        <div className="min-h-screen bg-gray-50">
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sell" element={<BecomeVendor />} />
            <Route path="shop" element={<ProductListPage />} />
            <Route path="vendors" element={<VendorsSectionPage />} />
            <Route path="vendor/:id" element={<StoreFront />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<AboutVendorHub />} />
            <Route path="cart" element={<Cart />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="superAdmin" element={<SuperAdminDashboard />} />
            <Route path="/vendor/register" element={<VendorRegistration />} />

            <Route element={<ProtectedRoute />}>
              <Route path="seller-admin" element={<VendorAdmin />} />
            </Route>

            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <InstallButton />
      </div>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 1000,
            color: "#144c6f",
          },
          error: {
            duration: 2000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#eaf2f4",
            color: "black",
          },
        }}
      />
    </>
  );
}
