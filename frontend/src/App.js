import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import StoreTable from './components/AdminPanel/StoreTable';
import CategoriesPage from './components/AdminPanel/CategoriesPage';
import ProductsPage from './components/AdminPanel/ProductsPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<StoreTable />} />
        <Route path="/categories/:storeId" element={<CategoriesPage />} />
        <Route path="/products/:storeId/:categoryId" element={<ProductsPage />} />
      </Routes>
  );
}

export default App;
