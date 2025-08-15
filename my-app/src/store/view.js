import { createSlice } from '@reduxjs/toolkit';

function typeAndParametres(typeOfAction, actionParams) {
  console.log(`Redux action - ${typeOfAction};`, 'Parameters passed to the action:', actionParams);
}

const initialViewState = { viewOnly: false };

const viewSlice = createSlice({
  name: 'viewOnly',
  initialState: initialViewState,
  reducers: {
    checkView(state, action) {
      state.viewOnly = action.payload;
      typeAndParametres(action.type, action.payload);
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice.reducer;
