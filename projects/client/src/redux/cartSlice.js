import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: 0,
        total_price: 0
    },
    reducers: {
        add: (state, action) => {
            console.log(action.payload)

            state.cart = action.payload.cart
            state.total_price = action.payload.total_price
        },
        clear: (state, action) => {
            state.cart = 0
            state.total_price = 0
        }

    }
});

export const { add, clear } = cartSlice.actions;
export default cartSlice.reducer