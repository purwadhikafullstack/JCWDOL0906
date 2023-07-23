import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        category: 0
    },
    reducers: {
        setCategory: (state, action) => {


            state.category = action.payload.category_id;
        }
    },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;
