import {create} from "zustand";
import Cookies from "js-cookie";
import {enqueueSnackbar} from "notistack";

interface AuthStore {
  user: string | null;
  setUser: (userToken: string) => void;
  logout: () => void;
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
}));

export default useAuthStore;
