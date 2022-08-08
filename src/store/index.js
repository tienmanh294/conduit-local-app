import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: userSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
