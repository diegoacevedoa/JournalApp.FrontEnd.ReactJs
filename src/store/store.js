import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { notesSlice } from "./slices/notes/notesSlice";
import { uiSlice } from "./slices/ui";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    notes: notesSlice.reducer,
  },
});
