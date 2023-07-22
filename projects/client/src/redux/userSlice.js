import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    username: "",
    email: "",
    phone_number: "",
    role: 0,
    is_verified: 0,
    verification_token: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.phone_number = action.payload.phone_number;
      state.value.role = action.payload.role;
      state.value.is_verified = action.payload.is_verified;
      state.value.verification_token = action.payload.verification_token;
    },
    logout: (state) => {
      state.value.id = 0;
      state.value.username = "";
      state.value.email = "";
      state.value.phone_number = "";
      state.value.is_verified = 0;
      state.value.verification_token = "";
      state.value.role = 0;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
