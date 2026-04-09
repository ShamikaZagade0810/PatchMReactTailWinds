
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const auth = useAuth();
//   const location = useLocation();
//   const checkAuth = localStorage.getItem("authenticated");
//   // if (!auth.isAuthenticated) {
//   if (checkAuth == false) {
//     // Redirect to login page, but save the current location
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;







import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  const checkAuth = localStorage.getItem("authenticated"); 
  const role = localStorage.getItem("role"); 

  // console.log("role from local storage : ",role);
  

  // not logged in
  if (checkAuth !== "true") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // role check (if provided)

  // console.log("check allow :",allowedRoles);
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/Unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

