import React, { useState } from "react";
import Button from "./Maquetado/Button";
import Input from "./Maquetado/Input";

export default function SearchBar({ setView }) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex w-full justify-around mb-3">
        <Button click={() => setView("orden")} name="Crear Orden" />
        <Button click={() => setView("vigas")} name="Crear Viga" />
      </div>
      <div className="flex relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <Input
          placeholder="Search number order..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="w-10">🔎</button>
      </div>
    </div>
  );
}
