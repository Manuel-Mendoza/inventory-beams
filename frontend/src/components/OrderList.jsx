import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ListadoBase from "./Vistas/ListadoBase";
import BusquedaRealizada from "./Vistas/Busqueda";
import { useApiContext } from "../context/ApiContext";
import Loading from "./Vistas/Loading";

export default function OrdenesList({ setView, setSelectedViga, setSelectedOrden }) {
  const [search, setSearch] = useState("");
  const { orden, loading, fetchOrdenes, error } = useApiContext();

  useEffect(() => {
    fetchOrdenes(search);
  }, [search]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <SearchBar setSearch={setSearch} setView={setView} search={search} />
      {loading && <p className='text-center'>loading...</p>}
      {error ? (
        <div className="flex">
          <strong className="text-center w-full">
            No orders found
          </strong>
        </div>
      ) : search === "" ? (
        <ListadoBase orden={orden} setSelectedViga={setSelectedViga} setSelectedOrden={setSelectedOrden} />
      ) : (
        <BusquedaRealizada orden={orden} setSelectedViga={setSelectedViga} setSelectedOrden={setSelectedOrden} />
      )}
    </div>
  );
}
