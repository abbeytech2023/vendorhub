import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        // create new array with updated item
        updatedItems = prevCart[vendorKey].items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
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
        // Reduce quantity
        updatedItems[productIndex].qty -= 1;
      } else {
        // Remove product
        updatedItems.splice(productIndex, 1);
      }

      // If vendor has no more items remove vendor cart
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

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
