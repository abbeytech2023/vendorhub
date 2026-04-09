import { useContext } from "react";
import CartContext from "../context/CartContext";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("context must be used inside provider");

  return context;
};
