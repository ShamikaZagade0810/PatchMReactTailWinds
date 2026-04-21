

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { USERS } from "../config/rbac";
// import { authApi } from "../services/projectApi.js";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAuthLoading, setIsAuthLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }

//     setIsAuthLoading(false);
//   }, []);

//   const login = async (username, password) => {
//     try {
      
//         console.log("user before passing to login in function: ", username,password);
//       const response = await authApi.login({ username, password });
//     console.log("user after passing to login in function: ", response);
//       if (response.data.status !== "success") return null;

//       const { accessToken, refreshToken, user } = response.data.data;

//       if (user.username === "poc") {
//         // user.role = "developer";
//         user.permissions = ["create_sbom"];
//       }

//       // Store tokens4
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("authenticated", "true");
//       localStorage.setItem("role", user.role);
//       // Store user
//       localStorage.setItem("user", JSON.stringify(user));        

//       setUser(user);            
//       setIsAuthenticated(true);                     

//       return user;
//     } catch (error) {
//       return null;
//     }
//   };

//   // const logout = () => {
//   //   setUser(null);
//   //   setIsAuthenticated(false);
//   //   localStorage.removeItem("user");
//   // };

  
//   const logout = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");

//     try {
//       if (refreshToken) {
//         await authApi.logout(refreshToken);
//       }
//     } catch (error) {
//       console.error("Logout API failed");
//     }

//     localStorage.clear();
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isAuthLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };













import React, { createContext, useContext, useEffect, useState } from "react";
import { USERS } from "../config/rbac";
import { authApi } from "../services/projectApi";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setIsAuthLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
          console.log("user before passing to login in function: ", username,password);
      const response = await authApi.login({ username, password });

      if (response.data.status !== 200) return null;

      const { accessToken, refreshToken, user } = response.data.data;

      if (user.username === "poc") {
        // user.role = "developer";
        user.permissions = ["create_sbom"];
      }
      
      // Store tokens4
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("role", user.role);
      // Store user
      localStorage.setItem("user", JSON.stringify(user));        
       console.log("Login ---> ",user);
      setUser(user);            
      setIsAuthenticated(true);                     

      return user;
    } catch (error) {
       console.log("Error Login ",error);
      return null;
     
    }
  };

  // const logout = () => {
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   localStorage.removeItem("user");
  // };

  
  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout API failed");
    }

    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

