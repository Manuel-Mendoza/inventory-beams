import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import api from "./api";
import ListadoBase from "./Vistas/ListadoBase";
import BusquedaRealizada from "./Vistas/Busqueda";

export default function OrdenesList({ setView }) {
  const [orden, setOrden] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get(`ordenes/${search}`)
      .then((response) => {
        // Asegurarse de que siempre trabajamos con un array
        const data = response.data;
        // Si la respuesta es un objeto único, convertirlo en un array
        const ordenesArray = Array.isArray(data) ? data : [data];
        setOrden(ordenesArray);
      })
      .catch((error) => {
        console.error("Error al obtener las órdenes:", error);
      });
  }, [search]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <SearchBar setSearch={setSearch} setView={setView} search={search} />
      {orden.length === 0 ? (
        <p className="text-gray-500 text-center">No se encontraron órdenes.</p>
      ) : search === "" ? (
        <ListadoBase orden={orden} />
      ) : (
        <BusquedaRealizada orden={orden} />
      )}
    </div>
  );
}