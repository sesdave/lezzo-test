import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllStoresApi, addStoreToApi, updateStoreInApi, deleteStoreToApi } from '../../services/storesApi';

const initialState = {
  stores: [],
  loading: false,
  error: null,
};

export const addStore = createAsyncThunk(
  'stores/addstore',
  async (storeData) => {
    console.log("storeId", storeData.get('name'))
    try {
      const response = await addStoreToApi(storeData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to post category');
    }
  }
);

export const updateStoreById = createAsyncThunk(
  'store/updateStoreById',
  async ({ storeId, storeData }) => {
    console.log("got to edit", storeId, storeData.get('location'))
    try {
      const response = await updateStoreInApi(storeId, storeData);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to update store');
    }
  }
);

export const deleteStoreById = createAsyncThunk(
  'store/deleteStoreById',
  async ({ storeId }) => {
    try {
      const response = await deleteStoreToApi(storeId);
      if (!response.ok) {
        throw new Error('Failed to delete store');
      }
      return storeId;
    } catch (error) {
      throw new Error('Failed to delete store');
    }
  }
);


const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    fetchStoresRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStoresSuccess(state, action) {
      state.stores = action.payload;
      state.loading = false;
    },
    fetchStoresFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores.push(action.payload)
      })
      .addCase(addStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStoreById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stores.findIndex((store) => store.id === action.payload.id);
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      .addCase(updateStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = state.stores.filter(store => store.id !== action.payload);
      })
      .addCase(deleteStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  
});

export const { fetchStoresRequest, fetchStoresSuccess, fetchStoresFailure } = storeSlice.actions;

export const fetchStores = () => async dispatch => {
  try {
    dispatch(fetchStoresRequest());
    const data = await fetchAllStoresApi(); 
    dispatch(fetchStoresSuccess(data)); 
  } catch (error) {
    dispatch(fetchStoresFailure(error.message));
  }
};



export const selectStores = state => state.store.stores;
export const selectLoading = state => state.store.loading;
export const selectError = state => state.store.error;

export default storeSlice.reducer;
