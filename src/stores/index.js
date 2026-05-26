import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user_slice.js';
import commonReducer from './common_slice.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
    common: commonReducer,
  },
});

export default store;