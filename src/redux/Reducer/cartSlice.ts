// store/cartSlice.ts
import { Product } from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  flag: boolean;
}

const calCulateTotalAmount = (items: CartItem[]) => {
  return items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );
};
const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCart(),
  totalAmount: calCulateTotalAmount(getInitialCart()),
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
        state.totalAmount += action.payload.discountedPrice;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalAmount += action.payload.discountedPrice;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
      state.totalAmount = calCulateTotalAmount(state.items);
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
      state.totalAmount = calCulateTotalAmount(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem("cart");
      state.items = savedCart ? JSON.parse(savedCart) : [];
      state.totalAmount = calCulateTotalAmount(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
      state.flag = !state.flag;
      state.totalAmount = 0;
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
