import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendBill = createAsyncThunk(
  'bills/send',
  async (billData, thunkApi) => {
    return billData;
  }
);

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    bill: {},
  },
  reducers: {
    clearBill: (state, action) => {
      state.bill = {};
    }
  },
  extraReducers: builder => {
    builder.addCase(sendBill.fulfilled, (state, action) => {
      state.bill = {...action.payload};
    })
  }
});

export const billReducer = billSlice.reducer;

export const {
  clearBill,
} = billSlice.actions;