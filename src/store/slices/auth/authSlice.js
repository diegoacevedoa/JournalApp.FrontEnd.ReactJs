import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
    logout: () => {
      return {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;
