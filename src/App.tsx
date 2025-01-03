import { Navigate, Route, Routes } from 'react-router';

import './App.css';
import { Header } from './components';
import { CreateProduct, EditProduct, ProductDetails, Products } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path=":id/edit" element={<EditProduct />} />
        </Route>
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
