import {enqueueSnackbar} from "notistack";
import {postData} from "../../../api/APIMethods";
import useAuthStore from "../../../app/store/auth";
import User from "../../../entities/User";
import {LoginFormData} from "../pages/Login/useLoginFormData";
import {RegisterFormData} from "../pages/Register/useRegisterFormData";

interface AuthResponse {
  status: string;
  token: string;
  user: User;
}

const useAuthServices = () => {
  const {setToken, setUser} = useAuthStore();

  // LOGIN
  async function login(body: LoginFormData) {
    const res = await postData<AuthResponse>("/auth/login", body);
    if (res.status === 200) {
      setToken(res.data.token);
      setUser(res.data.user);
      enqueueSnackbar("Successfully Login", {variant: "success"});
    }
  }

  // REGISTER
  async function register(body: RegisterFormData) {
    const res = await postData<AuthResponse>("/auth/register", body);
    if (res.status === 201) {
      setToken(res.data.token);
      setUser(res.data.user);
      enqueueSnackbar("Successfully Register", {variant: "success"});
    }
  }

  return {login, register};
};

export default useAuthServices;
