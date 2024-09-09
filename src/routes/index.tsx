import { Spin } from "antd";
import { lazy, PropsWithChildren, Suspense, useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

const HomePage = lazy(() => import("./Home"));
const СandidatesPage = lazy(() => import("./Сandidates"));

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
         path: "candidates",
         element: <СandidatesPage />,
      },
   ]);

   return <Suspense fallback={<Spin />}>{routes}</Suspense>;
};

export default Router;
