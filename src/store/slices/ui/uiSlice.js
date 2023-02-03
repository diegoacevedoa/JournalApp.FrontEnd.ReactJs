import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.msgError = action.payload;
    },
    removeError: (state) => {
      state.msgError = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError, removeError, startLoading, finishLoading } =
  uiSlice.actions;
