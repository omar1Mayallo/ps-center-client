import {create} from "zustand";
import Cookies from "js-cookie";
import {enqueueSnackbar} from "notistack";
import api from "../../api";

interface UserInfoI {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  user: string | null;
  setUser: (userToken: string) => void;
  logout: () => void;
  setUserInfo: (userInfo: UserInfoI) => void;
  userInfo: UserInfoI | null;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: Cookies.get("token") || null,
  setUser: (userToken: string) => {
    Cookies.set("token", userToken, {expires: 10});
    set({user: Cookies.get("token")});
  },
  logout: () => {
    enqueueSnackbar("Successfully logged out", {variant: "success"});
    Cookies.remove("token");
    set({user: null});
  },
  setUserInfo: (userInfo: UserInfoI) => {
    set({userInfo});
  },
  userInfo: null,
}));

export const useLoggedUser = async () => {
  const {user, setUserInfo} = useAuthStore();
  const res = await api.get("/users/my-profile", {
    headers: {
      Authorization: "Bearer " + user,
    },
  });
  setUserInfo(res.data.data.doc as UserInfoI);
};

export default useAuthStore;
