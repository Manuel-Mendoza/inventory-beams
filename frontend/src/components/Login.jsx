import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Maquetado/Input";
import Button from "./Maquetado/Button";

// API URL
const API_BASE = "https://vigasapp-production.up.railway.app/api/";
const API_LOCAL = "http://localhost:8000/api/";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llamada a la API de login
      const response = await axios.post(`${API_LOCAL}login/`, {
        username,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      // Navegar a la aplicación principal
      navigate("/app");
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Respuesta del servidor:", err.response?.data);
      setError(
        err.response?.data?.non_field_errors?.[0] ||
          JSON.stringify(err.response?.data) ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 !overflow-hidden">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-800">
          Inventory Beams Login
        </h2>

        {error && (
          <div className="mb-4 p-2 md:p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3 md:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
              Usuario
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              style="w-full"
            />
          </div>

          <div className="mb-4 md:mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              style="w-full"
            />
          </div>

          <div className="flex items-center justify-center flex-col gap-2">
            <Button
              type="submit"
              name={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              bg="blue"
              style="!w-full"
              click={handleLogin}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
