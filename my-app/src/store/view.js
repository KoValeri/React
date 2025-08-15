import { createSlice } from '@reduxjs/toolkit';

const initialViewState = { viewOnly: false };

const viewSlice = createSlice({
  name: 'viewOnly',
  initialState: initialViewState,
  reducers: {
    checkView(state, action) {
      state.viewOnly = action.payload;
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice.reducer;
