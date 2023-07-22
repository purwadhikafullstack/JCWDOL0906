import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: 0,
    total_price: 0,
    address_id: 0,
    courier: "",
  },
  reducers: {
    add: (state, action) => {
      console.log(action.payload);

      state.cart = action.payload.cart;
      state.total_price = action.payload.total_price;
    },
    clear: (state, action) => {
      state.cart = 0;
      state.total_price = 0;
    },
    addAddress: (state, action) => {
      state.address_id = action.payload.address_id;
    },
    addCourier: (state, action) => {
      console.log('courier ni bos', action.payload.courier)
      state.courier = action.payload.courier;
    },
  },
});

export const { add, clear, addAddress, addCourier } = cartSlice.actions;
export default cartSlice.reducer;
