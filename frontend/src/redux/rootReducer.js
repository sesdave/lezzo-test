import { combineReducers } from 'redux';
import storeReducer from './slice/storeSlice'; 
import categoryReducer from './slice/categorySlice';
import productReducer from './slice/productSlice'

const rootReducer = combineReducers({
  store: storeReducer, 
  category: categoryReducer,
  product: productReducer
});

export default rootReducer;
