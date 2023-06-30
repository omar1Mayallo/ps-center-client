import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../app/store/auth";

const AuthRoutes = () => {
  const {user} = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const PrivateRoutes = ({userRole}: {userRole: string | string[]}) => {
  const {userInfo} = useAuthStore();

  if (userInfo) {
    const isAuthorized = Array.isArray(userRole)
      ? userRole.includes(userInfo.role)
      : userInfo?.role === userRole;

    if (isAuthorized) {
      return <Outlet />;
    }
  }

  return <Navigate to="/" />;
};

export {AuthRoutes, PrivateRoutes};
