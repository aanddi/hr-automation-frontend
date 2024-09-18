import { PropsWithChildren, Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { AppLayout } from '@common/components';
import AuthProvider from '@common/providers/AuthProvider';

import { Spin } from 'antd';

const HomePage = lazy(() => import('./Home'));
const AuthPage = lazy(() => import('./Auth'));
const ListRequestsPage = lazy(() => import('./ListRequests'));
const RequestPage = lazy(() => import('./Request'));

export const ScrollToTop = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      ),
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/requests',
      element: (
        <AuthProvider>
          <ListRequestsPage />
        </AuthProvider>
      ),
    },
    {
      path: '/request/:id',
      element: (
        <AuthProvider>
          <RequestPage />
        </AuthProvider>
      ),
    },
  ]);

  return (
    <AppLayout>
      <Suspense fallback={<Spin />}>{routes}</Suspense>
    </AppLayout>
  );
};

export default Router;
