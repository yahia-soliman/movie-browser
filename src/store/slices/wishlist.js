import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: INITIAL_STATE,
  reducers: {
    addToList: (state, {payload}) => {
	    state.push(payload);
    },
    removeFromList: (state, {payload}) => {
      const idx = state.findIndex(({id}) => id == payload.id);
	    state.splice(idx, 1);
    }
  },
});

export const {
  addToList,
  removeFromList,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
