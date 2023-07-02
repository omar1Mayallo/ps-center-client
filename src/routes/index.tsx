import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout";
import NotFound from "../pages/404";
import Login from "../pages/Auth/pages/Login";
import Register from "../pages/Auth/pages/Register";
import Devices from "../pages/Devices";
import Orders from "../pages/Orders";
import Sessions from "../pages/Sessions";
import Snacks from "../pages/Snacks";
import Users from "../pages/Users";
import {AuthRoutes, PrivateRoutes} from "./AuthRoutes";
import {UserRoles} from "../entities/User";
import EditSnack from "../pages/Snacks/pages/EditSnack";
import CreateSnack from "../pages/Snacks/pages/CreateSnack";

const router = createBrowserRouter([
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AuthRoutes />,
        children: [
          {index: true, element: <Devices />},
          {
            element: (
              <PrivateRoutes userRole={[UserRoles.ADMIN, UserRoles.OWNER]} />
            ),
            children: [
              {
                path: "snacks",
                children: [
                  {index: true, element: <Snacks />},
                  {
                    element: <PrivateRoutes userRole={UserRoles.OWNER} />,
                    children: [
                      {path: ":snackId/edit", element: <EditSnack />},
                      {path: "create", element: <CreateSnack />},
                    ],
                  },
                ],
              },
              {path: "orders", element: <Orders />},
              {path: "sessions", element: <Sessions />},
              {path: "users", element: <Users />},
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
