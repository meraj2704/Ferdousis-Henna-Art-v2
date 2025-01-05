import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsOpenI {
  isOpen: boolean;
  data: any;
}

const initialState: IsOpenI = {
  isOpen: false,
  data: {},
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setModalData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isOpen = true;
    },
  },
});

export const { setModalOpen,setModalData } = modalSlice.actions;
export default modalSlice.reducer;
