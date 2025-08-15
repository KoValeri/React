import { configureStore } from '@reduxjs/toolkit';

import songReducer from './song';
import viewReducer from './view';

const store = configureStore({
  reducer: { song: songReducer, view: viewReducer },
});

export default store;
