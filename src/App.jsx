import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import BecomeVendor from "./components/BecomeAVendor";
import VendorRegistration from "./pages/VendorRegistration";
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

import { useAuthContext } from "./hooks/useAuthContext";

export default function App() {
  const { authIsReady } = useAuthContext();

  return (
    <>
      {/* Loader */}
      {!authIsReady && <Spinner />}

      {/* App Content */}
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
            <Route path="cart" element={<Cart />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="/vendor/register" element={<VendorRegistration />} />

            <Route element={<ProtectedRoute />}>
              <Route path="seller-admin" element={<VendorAdmin />} />
            </Route>
          </Routes>
        </div>
      )}

      {/* Floating Install Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <InstallButton />
      </div>

      {/* Toast Notifications */}
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
