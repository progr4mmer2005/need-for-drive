import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Loader } from '@/shared/components/Loader';
import { AuthProvider, useAuth } from '@/shared/context/AuthContext';

const HomePage = lazy(() => import('@/pages/HomePage'));
const OrderPage = lazy(() => import('@/pages/OrderPage'));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage'));
const OrdersPage = lazy(() => import('@/pages/admin/OrdersPage'));
const CarsPage = lazy(() => import('@/pages/admin/CarsPage'));
const CarEditPage = lazy(() => import('@/pages/admin/CarEditPage'));
const AdminErrorPage = lazy(() => import('@/pages/admin/AdminErrorPage'));
const CitiesPage = lazy(() => import('@/pages/admin/CitiesPage'));
const CityEditPage = lazy(() => import('@/pages/admin/CityEditPage'));
const CategoriesPage = lazy(() => import('@/pages/admin/CategoriesPage'));
const CategoryEditPage = lazy(() => import('@/pages/admin/CategoryEditPage'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const UserEditPage = lazy(() => import('@/pages/admin/UserEditPage'));
const RatesPage = lazy(() => import('@/pages/admin/RatesPage'));
const RateEditPage = lazy(() => import('@/pages/admin/RateEditPage'));
const RateTypesPage = lazy(() => import('@/pages/admin/RateTypesPage'));
const RateTypeEditPage = lazy(() => import('@/pages/admin/RateTypeEditPage'));
const PointsPage = lazy(() => import('@/pages/admin/PointsPage'));
const PointEditPage = lazy(() => import('@/pages/admin/PointEditPage'));
const OrderEditPage = lazy(() => import('@/pages/admin/OrderEditPage'));
const OrderStatusesPage = lazy(() => import('@/pages/admin/OrderStatusesPage'));
const OrderStatusEditPage = lazy(() => import('@/pages/admin/OrderStatusEditPage'));

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) return <Loader fullHeight />;
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

            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/admin/orders" replace />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderEditPage />} />
              <Route path="order-statuses" element={<OrderStatusesPage />} />
              <Route path="order-statuses/new" element={<OrderStatusEditPage />} />
              <Route path="order-statuses/:id" element={<OrderStatusEditPage />} />
              <Route path="cities" element={<CitiesPage />} />
              <Route path="cities/new" element={<CityEditPage />} />
              <Route path="cities/:id" element={<CityEditPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="categories/new" element={<CategoryEditPage />} />
              <Route path="categories/:id" element={<CategoryEditPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserEditPage />} />
              <Route path="points" element={<PointsPage />} />
              <Route path="points/new" element={<PointEditPage />} />
              <Route path="points/:id" element={<PointEditPage />} />
              <Route path="rates" element={<RatesPage />} />
              <Route path="rates/new" element={<RateEditPage />} />
              <Route path="rates/:id" element={<RateEditPage />} />
              <Route path="rate-types" element={<RateTypesPage />} />
              <Route path="rate-types/new" element={<RateTypeEditPage />} />
              <Route path="rate-types/:id" element={<RateTypeEditPage />} />
              <Route path="cars" element={<CarsPage />} />
              <Route path="cars/new" element={<CarEditPage />} />
              <Route path="cars/:id" element={<CarEditPage />} />
              <Route path="error" element={<AdminErrorPage code={500} />} />
              <Route path="*" element={<AdminErrorPage code={404} />} />
            </Route>

            <Route path="*" element={<AdminErrorPage code={404} />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
}
