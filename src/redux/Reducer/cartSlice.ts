// store/cartSlice.ts
import { Product } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  flag: boolean;
}

// Get cart items from local storage
const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCart(),
  flag: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload.id
          );
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem("cart");
      state.items = savedCart ? JSON.parse(savedCart) : [];
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
      state.flag = !state.flag;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  loadCartFromStorage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
