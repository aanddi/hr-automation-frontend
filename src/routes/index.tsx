import { Spin } from "antd";
import { lazy, PropsWithChildren, Suspense, useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from "../common/components/Layout";

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
   const routesSite = useRoutes([
      {
         path: "/",
         element: (
            <Suspense fallback={<Spin />}>
               <Layout>
                  <HomePage />
               </Layout>
            </Suspense>
         ),
      },
      {
         path: "candidates",
         element: (
            <Suspense fallback={<Spin />}>
               <Layout>
                  <СandidatesPage />
               </Layout>
            </Suspense>
         ),
      },
   ]);

   return routesSite;
};

export default Router;
