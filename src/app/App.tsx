import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { Loader } from '@/shared/components/Loader';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const OrderPage = lazy(() => import('@/pages/OrderPage').then((m) => ({ default: m.OrderPage })));

export function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loader fullHeight />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:stepSlug" element={<OrderPage />} />
            <Route path="/order/success/:orderId" element={<OrderPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
