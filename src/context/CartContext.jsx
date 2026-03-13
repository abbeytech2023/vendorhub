import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const vendorKey = product.whatsapp;

      if (!prevCart[vendorKey]) {
        return {
          ...prevCart,
          [vendorKey]: {
            vendor: product.vendor,
            whatsapp: product.whatsapp,
            items: [{ ...product, qty: 1 }],
          },
        };
      }

      const existingProductIndex = prevCart[vendorKey].items.findIndex(
        (item) => item.id === product.id,
      );

      let updatedItems;

      if (existingProductIndex > -1) {
        // Increment quantity if product exists
        updatedItems = prevCart[vendorKey].items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        // Add new product
        updatedItems = [...prevCart[vendorKey].items, { ...product, qty: 1 }];
      }

      return {
        ...prevCart,
        [vendorKey]: {
          ...prevCart[vendorKey],
          items: updatedItems,
        },
      };
    });
  };

  // Remove product from cart (decrease qty or remove)
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const vendorKey = product.whatsapp;
      if (!prevCart[vendorKey]) return prevCart;

      const productIndex = prevCart[vendorKey].items.findIndex(
        (item) => item.id === product.id,
      );
      if (productIndex === -1) return prevCart;

      const updatedItems = [...prevCart[vendorKey].items];

      if (updatedItems[productIndex].qty > 1) {
        updatedItems[productIndex].qty -= 1;
      } else {
        updatedItems.splice(productIndex, 1);
      }

      if (updatedItems.length === 0) {
        const newCart = { ...prevCart };
        delete newCart[vendorKey];
        return newCart;
      }

      return {
        ...prevCart,
        [vendorKey]: {
          ...prevCart[vendorKey],
          items: updatedItems,
        },
      };
    });
  };

  // Clear entire cart
  const clearCart = () => setCart({});

  // ✅ Get total number of items in the cart (sum qty across all vendors)
  const getCartCount = () => {
    return Object.values(cart).reduce((total, vendorCart) => {
      return (
        total + vendorCart.items.reduce((sum, item) => sum + (item.qty || 1), 0)
      );
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
