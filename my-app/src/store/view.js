import { createSlice } from '@reduxjs/toolkit';

const initialViewState = JSON.parse(localStorage.getItem('viewOnlyMode')) || { viewOnly: false };

const viewSlice = createSlice({
  name: 'viewOnly',
  initialState: initialViewState,
  reducers: {
    checkView(state, action) {
      state.viewOnly = action.payload;

      localStorage.setItem(
        'viewOnlyMode',
        JSON.stringify({
          viewOnly: state.viewOnly,
        })
      );
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice.reducer;
