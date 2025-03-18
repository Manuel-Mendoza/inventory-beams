import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Maquetado/Input";
import Button from "./Maquetado/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, password });
    // Simplemente navegamos a la aplicación principal
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inventory Beams Login
        </h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
          
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              name="Iniciar Sesión"
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
