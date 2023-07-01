import useAuthStore from "../../app/store/auth";

const useUserRole = () => {
  let userRole = "";
  let isOwner = false;

  const userInfo = useAuthStore((s) => s.userInfo);
  if (userInfo) {
    userRole = userInfo.role;
    isOwner = userRole === "OWNER";
  }
  return {userRole, isOwner};
};

export default useUserRole;
