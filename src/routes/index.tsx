import { Spin } from "antd";
import { lazy, PropsWithChildren, Suspense, useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

const HomePage = lazy(() => import("./Home"));
const СandidatesPage = lazy(() => import("./Сandidates"));
const ListRequestsPage = lazy(() => import("./ListRequests"));
const RequestPage = lazy(() => import("./Request"));

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
         path: "/",
         element: <HomePage />,
      },
      {
         path: "/candidates",
         element: <СandidatesPage />,
      },
      {
         path: "/requests",
         element: <ListRequestsPage />,
      },
      {
         path: "/request/:id",
         element: <RequestPage />,
      },
   ]);

   return <Suspense fallback={<Spin />}>{routes}</Suspense>;
};

export default Router;
