import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@redux/cart.slice';
import { productReducer } from '@redux/product.slice';
import { billReducer } from '@redux/bill.slice';

const reducer = {
  cart: cartReducer,
  product: productReducer,
  bill: billReducer,
};

const store = configureStore({
  reducer,
});

export default store;