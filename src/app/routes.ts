import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { EditRecordPage } from './pages/EditRecordPage';
import { AssetPage } from './pages/AssetPage';
import { SettingsPage } from './pages/SettingsPage';
import { DashboardPage } from './pages/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/product/:id',
    Component: ProductDetailPage,
  },
  {
    path: '/edit/:id?',
    Component: EditRecordPage,
  },
  {
    path: '/assets',
    Component: AssetPage,
  },
  {
    path: '/settings',
    Component: SettingsPage,
  },
]);
