import React, { useState } from "react";
import Button from "./Maquetado/Button";
import Input from "./Maquetado/Input";
import { useApiContext } from "../context/ApiContext";

export default function SearchBar({ setView, setSearch }) {
  const [busqueda, setBusqueda] = useState("");
  const { setError } = useApiContext();
  return (
    <div className="p-6 flex flex-col items-center w-full">
      <div className="max-md:grid min-md:flex justify-center grid-cols-2 gap-1 mb-3 w-full">
        {/* <Button click={() => setView("vigas")} bg={'red'} name="Delete ➖" />*/}
        <Button
          click={() => setView("orden")}
          style={"col-span-2"}
          name="Add Order ➕"
        />
        <Button click={() => setView("edit")} bg={"gray"} name="Edit ✍️" style={'col-span-2'} />
      </div>
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
