import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Letter({ setView, view }) {
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex gap-4 flex-col justify-between items-center mb-4 p-2">
      <div className="flex items-center justify-between w-full">
        <span className="mr-4 text-gray-600">
          User: {username || "Admin"}
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center max-md:grid gap-2 w-full">
        <h1 className="text-2xl text-start w-full font-bold text-gray-800">Inventory Beams</h1>
        <div className="space-x-4 grid gap-2 min-md:grid-cols-3">
          <button
            onClick={() => setView("index")}
            className={`px-4 py-2 rounded-md mr-0 w-full ${
              view === "index"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Orders 🗒
          </button>
          <button
            onClick={() => setView("orden")}
            className={`px-4 py-2 rounded-md mr-0 w-full ${
              view === "orden"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            New Order ➕
          </button>
          <button
            onClick={() => setView("edit")}
            className={`px-4 py-2 rounded-md w-full ${
              view === "edit"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Edit Order ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
