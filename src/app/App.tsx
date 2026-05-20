import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout';
import { Loader } from '@/shared/components/Loader';
import { AuthProvider, useAuth } from '@/shared/context/AuthContext';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const OrderPage = lazy(() => import('@/pages/OrderPage').then((m) => ({ default: m.OrderPage })));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage/LoginPage').then((m) => ({ default: m.LoginPage })));
const OrdersPage = lazy(() => import('@/pages/admin/OrdersPage/OrdersPage').then((m) => ({ default: m.OrdersPage })));
const CarsPage = lazy(() => import('@/pages/admin/CarsPage/CarsPage').then((m) => ({ default: m.CarsPage })));
const CarEditPage = lazy(() => import('@/pages/admin/CarEditPage/CarEditPage').then((m) => ({ default: m.CarEditPage })));
const AdminErrorPage = lazy(() => import('@/pages/admin/AdminErrorPage/AdminErrorPage').then((m) => ({ default: m.AdminErrorPage })));

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Suspense fallback={<Loader fullHeight />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order/:stepSlug" element={<OrderPage />} />
              <Route path="/order/success/:orderId" element={<OrderPage />} />
            </Route>

            <Route path="/admin/login" element={<LoginPage />} />

            <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
              <Route index element={<Navigate to="/admin/orders" replace />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<AdminErrorPage code={200} message="Редактирование заказа" />} />
              <Route path="cars" element={<CarsPage />} />
              <Route path="cars/new" element={<CarEditPage />} />
              <Route path="cars/:id" element={<CarEditPage />} />
              <Route path="error" element={<AdminErrorPage code={500} />} />
              <Route path="*" element={<AdminErrorPage />} />
            </Route>

            <Route path="*" element={<AdminErrorPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
}
