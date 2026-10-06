import { Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<CatalogPage />} />
        <Route path="produtos/categoria/:categoria" element={<CatalogPage />} />
        <Route path="produtos/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
