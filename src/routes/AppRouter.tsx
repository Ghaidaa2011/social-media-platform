import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
//Layouts
const MainLayout = lazy(() => import("../layouts/MainLayout"));
//Pages
const Home = lazy(() => import("../pages/Home/Home"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
import Error from "../pages/Error/Error";
//components
import Spinner from "../components/feedback/Spinner/Spinner";
import PageSuspenseFallback from "../components/feedback/PageSuspenseFallback/PageSuspenseFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <PageSuspenseFallback>
            <Profile />
          </PageSuspenseFallback>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
