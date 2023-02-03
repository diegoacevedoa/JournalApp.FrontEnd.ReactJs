import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  active: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote: (state, action) => {
      state.notes = [action.payload, ...state.notes];
    },
    activeNote: (state, action) => {
      state.active = action.payload;
    },
    loadNotes: (state, action) => {
      state.notes = action.payload;
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    deleteNote: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    logoutCleaningNote: (state) => {
      state.active = null;
      state.notes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  activeNote,
  loadNotes,
  updateNote,
  addNewNote,
  deleteNote,
  logoutCleaningNote,
} = notesSlice.actions;
