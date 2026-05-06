import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { HomePage } from '@/pages/HomePage';
import { OrderPage } from '@/pages/OrderPage';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/success/:orderId" element={<OrderPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
