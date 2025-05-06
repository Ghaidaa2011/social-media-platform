import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
//Layouts
const MainLayout = lazy(() => import("@layouts/MainLayout"));
//Pages
const Home = lazy(() => import("@pages/Home/Home"));
const Profile = lazy(() => import("@pages/Profile/Profile"));
const Error = lazy(() => import("@pages/Error/Error"));
//components
import { Spinner, PageSuspenseFallback } from "@components/feedback";

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
