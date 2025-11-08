// AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
