import { createBrowserRouter, RouterProvider } from "react-router";
//Layouts
import MainLayout from "../layouts/MainLayout";
//Pages
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile/:id", element: <Profile /> },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
