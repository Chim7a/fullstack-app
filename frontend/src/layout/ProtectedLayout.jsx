import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { loginUser } = useSelector((state) => state.user);
  return loginUser === null ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedLayout;
