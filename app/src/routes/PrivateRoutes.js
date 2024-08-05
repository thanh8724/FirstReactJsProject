import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = (probs) => {
  if (probs.isLogin) {
    return <Navigate to="/" />;
  }
  return probs.children;
};

export default PrivateRoutes;
