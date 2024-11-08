// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductI } from "@/components/interface/Products";

interface CartItem extends ProductI {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  flag:boolean;
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
  flag:false
};
 const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductI>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag = !state.flag;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag =!state.flag;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.flag =!state.flag;
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem("cart");
      state.items = savedCart ? JSON.parse(savedCart) : [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, loadCartFromStorage } =
  cartSlice.actions;

export default cartSlice.reducer;