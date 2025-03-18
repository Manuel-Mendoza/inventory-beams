import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      
      if (token) {
        setIsAuthenticated(true);
        setUsername(storedUsername || "");
      } else {
        setIsAuthenticated(false);
        setUsername("");
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/");
  };

  // Valor del contexto que se proporcionará
  const contextValue = {
    isAuthenticated,
    username,
    loading,
    setIsAuthenticated,
    setUsername,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
