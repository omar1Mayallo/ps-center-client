import {createBrowserRouter} from "react-router-dom";
import NotFound from "../pages/404";
import Layout from "../layout";
import Devices from "../pages/Devices";
import Orders from "../pages/Orders";
import Snacks from "../pages/Snacks";
import Sessions from "../pages/Sessions";
import Login from "../pages/Auth/pages/Login";
import Register from "../pages/Auth/pages/Register";
import Users from "../pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <Devices />},
      {path: "orders", element: <Orders />},
      {path: "snacks", element: <Snacks />},
      {path: "sessions", element: <Sessions />},
      {path: "users", element: <Users />},
      {path: "login", element: <Login />},
      {path: "register", element: <Register />},
    ],
  },
]);

export default router;
