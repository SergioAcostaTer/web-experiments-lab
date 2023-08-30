import { Product } from "@/types";
import { create } from "zustand";

interface ProductQ extends Product {
  quantity: number;
}

interface States {
  cart: any[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
  addOne: (itemId: number) => void;
  removeOne: (itemId: number) => void;
}

const useCart = create<States>((set) => {
  const isClient = typeof window !== "undefined";

  const initialCart = isClient ? localStorage.getItem("cart") : null;
  const initialCartArray = initialCart ? JSON.parse(initialCart) : [];

  return {
    cart: [...initialCartArray],

    addToCart: (item) => {
      set((state) => {
        console.log(item);
        const existingItem = state.cart.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          const updatedCart = state.cart.map((itemMap) =>
            itemMap.id === item.id
              ? { ...itemMap, quantity: itemMap.quantity + 1 }
              : itemMap
          );
          if (isClient) {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }
          return { cart: updatedCart };
        } else {
          const updatedCart = [
            ...state.cart,
            { ...item, quantity: 1, id: item.id },
          ];
          if (isClient) {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }
          return { cart: updatedCart };
        }
      });
    },

    removeFromCart: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== itemId);
        if (isClient) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return { cart: updatedCart };
      });
    },

    addOne: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        if (isClient) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return { cart: updatedCart };
      });
    },

    removeOne: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        if (isClient) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return { cart: updatedCart };
      });
    },

    updateCartItemQuantity: (itemId, newQuantity) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        if (isClient) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return { cart: updatedCart };
      });
    },
  };
});

export default useCart;
