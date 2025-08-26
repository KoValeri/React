import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import songReducer from './song';
import viewReducer from './view';
import authReducer from './auth';

const store = configureStore({
  reducer: { song: songReducer, view: viewReducer, auth: authReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
