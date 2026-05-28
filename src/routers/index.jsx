import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';

import ProtectedRoute from '../components/auth/ProtectedRoute';
import PublicRoute from '../components/auth/PublicRoute';

import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import DataManagement from '../pages/DataManagement';
import StockData from '../pages/StockData'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'auth',
        element: (
          <PublicRoute>
            <Auth />
          </PublicRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'datamanagement',
        element: (
          <ProtectedRoute>
            <DataManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'stock',
        element: (
          <ProtectedRoute>
            <StockData />
          </ProtectedRoute>
        ),
      },
      {
        index: true,
        element: <Dashboard />, // or redirect logic
      },
    ],
  },
]);

export default router;