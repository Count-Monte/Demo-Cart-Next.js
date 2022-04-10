import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductCount } from '@/api/products';

export const fetchProductByPage = createAsyncThunk(
  'products/fetchByPage',
  async ({ pageNo, pageSize }, thunkApi) => {
    const products = getProducts(pageNo, pageSize);
    return products;
  }
);

export const fetchProductCount = createAsyncThunk(
  'products/fetchCount',
  async (arg, thunkApi) => {
    const count = getProductCount();
    return count;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    count: 0
  },
  reducers: {
    clearProducts: (state, action) => {
      state.products = [];
      state.count = 0;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProductByPage.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    builder.addCase(fetchProductCount.fulfilled, (state, action) => {
      state.count = action.payload;
    })
  }
});

export const productReducer = productSlice.reducer;

export const {
  clearProducts,
} = productSlice.actions;