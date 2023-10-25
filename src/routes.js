import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import List from "./pages/List";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Registration/>
      },
      {
        path: "Registration",
        element: <Registration/>
      },
      {
        path: "List",
        element:<List/>
      },
    ],
  },
]);

export default routes;
