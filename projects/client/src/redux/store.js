import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        userSlice,
        cartSlice,
        productSlice,
    },
});
