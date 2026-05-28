import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user_slice.js';
import commonReducer from './common_slice.js';
import stockReducer from './stock_slice.js'

const store = configureStore({
  reducer: {
    auth: authSlice,
    common: commonReducer,
    stock: stockReducer,

  },
});

export default store;