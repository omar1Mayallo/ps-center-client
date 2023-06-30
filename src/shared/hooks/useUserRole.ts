import useAuthStore from "../../app/store/auth";

const useUserRole = () => {
  const userInfo = useAuthStore((s) => s.userInfo);
  if (userInfo) {
    return userInfo.role;
  }
};

export default useUserRole;
