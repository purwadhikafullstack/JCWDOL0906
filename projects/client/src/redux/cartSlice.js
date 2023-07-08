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

            // let index = cart.findIndex(i => i.name === action.payload.name)

            // if (index !== -1) {
            //     let obj = cart[index]
            //     obj.qty++
            //     obj.total_price = obj.qty * obj.price
            //     cart.splice(index, 1, obj)
            // } else {
            //     cart.push(action.payload)
            // }

        },

    }
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer