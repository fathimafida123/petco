import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function UserRoute() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // If admin tries to access user pages
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default UserRoute;