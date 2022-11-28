import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginReducer from "./features/loginSlice";
import productReducer from "./features/ProductSlice";
import cartRecure from './features/cartSlice';
import messageReducer from './features/messageSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
    cart :cartRecure,
    message:messageReducer  
  },
});
