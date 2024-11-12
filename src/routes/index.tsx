import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { AppLayout, Loading } from '@common/components';

const HomePage = lazy(() => import('./Home'));
const ListRequestsPage = lazy(() => import('./ListRequests'));
const RequestPage = lazy(() => import('./Request'));

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/requests',
      element: <ListRequestsPage />,
    },
    {
      path: '/request/:id',
      element: <RequestPage />,
    },
  ]);

  return (
    <AppLayout>
      <Suspense fallback={<Loading />}>{routes}</Suspense>
    </AppLayout>
  );
};

export default Router;
