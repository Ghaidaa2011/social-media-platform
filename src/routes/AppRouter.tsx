import { createBrowserRouter, RouterProvider } from "react-router";
//Layouts
import MainLayout from "../layouts/MainLayout";
//Pages
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
