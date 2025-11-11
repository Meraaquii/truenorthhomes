// AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authData = localStorage.getItem("auth");
        if (authData) {
          const parsedAuth = JSON.parse(authData);
          if (parsedAuth.status === 1) {
            setIsAuthenticated(true);
            // Set user role if available in stored data
            // setUserRole(parsedAuth.userRole);
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem("auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
