import React from "react";

export default function SearchBar({ setView }) {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex w-full justify-around mb-3">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          onClick={() => alert("Crear Orden")}
        >
          Crear Orden
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
          Crear Viga
        </button>
      </div>
      <div className="flex relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <input
          type="text"
          placeholder="Search number order..."
          className="w-full px-4 py-2 pl-10 text-gray-700"
        />
        <button className="w-10">🔎</button>
      </div>
    </div>
  );
}
