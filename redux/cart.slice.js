import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
    },
    updateQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (action.payload.quantity <= 0) {
        const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
      } else {
        item.quantity = action.payload.quantity;
        if (item.quantity < item.voucherCnt) {
          item.voucherCnt = item.quantity;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    addVoucher: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (action.payload.quantity <= 0) {
        console.error('voucher not found');
      } else {
        const voucherCnt = item.quantity < action.payload.quantity ? item.quantity : action.payload.quantity;
        item.voucherCnt = voucherCnt;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    clearCart: (state, action) => {
      state.length = 0;
    }
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  updateQuantity,
  decrementQuantity,
  removeFromCart,
  addVoucher,
  clearCart,
} = cartSlice.actions;