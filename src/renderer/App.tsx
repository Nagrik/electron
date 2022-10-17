import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './LeftMenu';
import MainPage from './MainPage';
import SuppliersPage from './SuppliersPage';
import Supplier from './Supplier';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import CustomersPage from './CustomersPage';
import Customer from './Customer';
import SearchPage from './SearchPage';
import Order from './Order';
import Product from './Product';

export default function App() {
  return (
    <>
      <Router>
        <Home>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/supplier/:id" element={<Supplier />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customer/:id" element={<Customer />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Home>
      </Router>
    </>
  );
}
