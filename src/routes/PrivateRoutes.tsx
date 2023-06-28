import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../app/store/auth";
import {enqueueSnackbar} from "notistack";

const PrivateRoutes = () => {
  const {user} = useAuthStore();
  if (!user) {
    enqueueSnackbar("Please login to get access", {variant: "error"});
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
