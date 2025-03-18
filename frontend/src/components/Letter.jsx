import React from "react";
import { useNavigate } from "react-router-dom";

export default function Letter({ setView, view }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Redirigir al login
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Beams</h1>
        <div className="ml-6 space-x-4">
          <button
            onClick={() => setView("index")}
            className={`px-4 py-2 rounded-md ${
              view === "index"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setView("orden")}
            className={`px-4 py-2 rounded-md ${
              view === "orden"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            New Order
          </button>
          <button
            onClick={() => setView("edit")}
            className={`px-4 py-2 rounded-md ${
              view === "edit"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Edit Order
          </button>
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="mr-4 text-gray-600">
          Usuario: Admin
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
