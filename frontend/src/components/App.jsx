import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "./Login";
import Inicio from "./Index";
import ProtectedRoute from "./ProtectedRoute";

// Componente principal que proporciona el contexto de autenticación
const AppWithAuth = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

// Componente raíz que proporciona el BrowserRouter
export default function App() {
  return (
    <BrowserRouter>
      <AppWithAuth />
    </BrowserRouter>
  );
}
