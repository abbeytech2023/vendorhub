import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import BecomeVendor from "./components/BecomeAVendor";
import VendorRegistration from "./pages/VendorRegistration";
import VendorsSection from "./components/VendorGrid";
import Cart from "./pages/Cart";
import ProductListPage from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import StoreFront from "./pages/StoreFront";

// Context

import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./pages/Login";

export default function App() {
  const { authIsReady } = useAuthContext();

  return (
    <>
      {!authIsReady && <Spinner />}
      {authIsReady && (
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sell" element={<BecomeVendor />} />
            <Route path="shop" element={<ProductListPage />} />
            <Route path="vendors" element={<VendorsSection />} />
            <Route path="vendor/:id" element={<StoreFront />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="/vendor/register" element={<VendorRegistration />} />
          </Routes>
        </div>
      )}
      {/* <PWAInstall /> */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
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
      {/* <Footer /> */}
    </>
  );
}

// // https://images.unsplash.com/photo-1597156776667-501b49b1f3d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FycyUyMHdhc2glMjBuaWdlcmlhfGVufDB8fDB8fHww
// https://plus.unsplash.com/premium_photo-1675881512867-ddd71d031c15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhciUyMGFuZCUyMGxvdW5nZSUyMGluJTIwbmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D
