import React, { useState } from "react";
import Button from "./Maquetado/Button";
import Input from "./Maquetado/Input";

export default function SearchBar({ setView, setSearch }) {
  const [busqueda, setBusqueda] = useState("");
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex w-full justify-around mb-3">
        <Button click={() => setView("orden")} name="Crear Orden" />
        <Button click={() => setView("vigas")} name="Crear Viga" />
      </div>
      <div className="flex flex-center relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <Input
          onChange={(e) => setBusqueda(`${e.target.value}/`)}
          type={"text"}
          style={"text-center w-"}
          placeholder="Search order number..."
        />
        <button onClick={() => setSearch(busqueda)} style={{padding:'2%'}}>🔎</button>
      </div>
    </div>
  );
}
