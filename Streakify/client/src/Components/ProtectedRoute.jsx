import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // Redirect to login if token is not present
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
