import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postCategoryToApi, fetchAllCategoriesByStoreIdApi, updateCategoryInApi, deleteCategoryToApi } from '../../services/categoryApi'; 

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const postCategory = createAsyncThunk(
  'categories/postCategory',
  async ({ categoryData, storeId }) => {
    console.log("storeId", storeId, JSON.stringify(categoryData))
    try {
      const response = await postCategoryToApi(storeId, categoryData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to post category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({storeId, categoryId, categoryData }) => {
    try {
      const response = await updateCategoryInApi(storeId, categoryId, categoryData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ storeId, categoryId }) => {
    try {
      const response = await deleteCategoryToApi(storeId, categoryId);
      return response
    } catch (error) {
      throw new Error('Failed to delete category');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess(state, action) {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload)
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((category) => category.categoryId === action.payload.categoryId);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category =>
          category.categoryId !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchCategoryRequest, fetchCategorySuccess, fetchCategoryFailure } = categorySlice.actions;

export const fetchCategoriesByStoreId = (storeId) => async dispatch => {
  try {
    dispatch(fetchCategoryRequest());
    const data = await fetchAllCategoriesByStoreIdApi(storeId); 
    dispatch(fetchCategorySuccess(data)); 
  } catch (error) {
    dispatch(fetchCategoryFailure(error.message));
  }
};



export const selectCategories = state => state.category.categories;
export const selectLoading = state => state.category.loading;
export const selectError = state => state.category.error;
export default categorySlice.reducer;
