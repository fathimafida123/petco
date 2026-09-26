// import { Navigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import React from 'react'

// function ProtecteRoute() {
//   const { user, isLoading } = useSelector((state) => state.auth)
//   console.log("Protected Route user:", user);
//   if (isLoading) {
//     return <h2>Loading...</h2>
//   }
//   if (!user) {
//     return <Navigate to="/login" replace />
//   }
//   return <Outlet />

// }

// export default ProtecteRoute
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

function ProtecteRoute() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin cannot access user-only pages
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default ProtecteRoute;