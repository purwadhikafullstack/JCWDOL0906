import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: 0,
        username: "",
        email: "",
        phone_number: "",
        role: "",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.id = action.payload.id;
            state.value.username = action.payload.username;
            state.value.email = action.payload.email;
            state.value.phone_number = action.payload.phone_number;
            state.value.role = action.payload.role;
        },
        logout: (state) => {
            state.value.id = 0;
            state.value.username = "";
            state.value.email = "";
            state.value.phone_number = "";
            state.value.role = "";
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;