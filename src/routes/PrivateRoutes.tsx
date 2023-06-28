import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../app/store/auth";

const PrivateRoutes = () => {
  const {user} = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
