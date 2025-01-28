import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedAdminLayout = () => {
  const { loginUser } = useSelector((state) => state.user);
  return loginUser && loginUser.userType !== "admin" ? (
    <Navigate to={"/marketplace"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedAdminLayout;
