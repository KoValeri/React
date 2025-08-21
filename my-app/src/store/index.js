import { configureStore } from '@reduxjs/toolkit';

import songReducer from './song';
import viewReducer from './view';
import authReducer from './auth';

const store = configureStore({
  reducer: { song: songReducer, view: viewReducer, auth: authReducer },
});

export default store;
