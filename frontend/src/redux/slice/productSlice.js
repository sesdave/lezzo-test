import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postProductToApi, fetchAllProductCategoriesByStoreIdApi, editProductToApi, deleteProductToApi } from '../../services/productApi'; 

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({ productData, storeId, categoryId }) => {
    try {
      const response = await postProductToApi(storeId, categoryId, productData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to post category');
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ productId, productData }) => {
    try {
      const response = await editProductToApi(productId, productData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    try {
      const response = await deleteProductToApi(productId);
      return response.json();
    } catch (error) {
      throw new Error('Failed to post product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action) {
      state.products = action.payload; 
      state.loading = false;
    },
    fetchProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((product) => product.productId === action.payload.productId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const retmes = String(action.payload)
        console.log("actions", retmes, state.products)
        state.loading = false;
        state.products = state.products.filter(product => product.productId !== action);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchProductRequest, fetchProductSuccess, fetchProductFailure } = productSlice.actions;

export const fetchProductCategoriesByStoreId = (storeId, categoryId) => async dispatch => {
  try {
    dispatch(fetchProductRequest());
    const data = await fetchAllProductCategoriesByStoreIdApi(storeId, categoryId); 
    dispatch(fetchProductSuccess(data)); 
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};



export const selectProducts = state => state.product.products;
export const selectLoading = state => state.product.loading;
export const selectError = state => state.product.error;
export default productSlice.reducer;
