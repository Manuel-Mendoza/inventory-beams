import React, { useState } from "react";
import Button from "./Maquetado/Button";
import Input from "./Maquetado/Input";
import { useApiContext } from "../context/ApiContext";

export default function SearchBar({ setView, setSearch }) {
  const [busqueda, setBusqueda] = useState("");
  const { setError } = useApiContext();
  return (
    <div className="p-6 flex flex-col items-center w-full">
      <div className="flex flex-center relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <Input
          value={busqueda}
          onChange={(e) => setBusqueda(`${e.target.value}`)}
          type={"number"}
          inputmode={"numeric"}
          style={"text-center w-"}
          placeholder="Search order number..."
        />
        {busqueda !== "" ? (
          <button
            onClick={() => {
              setSearch("");
              setBusqueda("");
              setError(false);
            }}
            style={{ padding: "2%" }}
          >
            ❌
          </button>
        ) : null}
        <button onClick={() => setSearch(busqueda)} style={{ padding: "2%" }}>
          🔎
        </button>
      </div>
    </div>
  );
}
