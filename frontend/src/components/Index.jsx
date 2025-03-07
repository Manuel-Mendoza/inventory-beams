import React, { useState, useEffect } from "react";
import axios from "axios";
import Letter from "./Letter";
import SearchBar from "./SearchBar";
import OrderList from "./OrderList";
import CreateOrder from "./CreateOrden";
import CreateViga from "./CreateVigas";

export default function Inicio() {
  const [view, setView] = useState("index");
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/fecha/")
      .then((respuesta) => {
        setDatos(respuesta.data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);
  console.log(datos);

  return (
    <div className="p-6">
      <Letter setView={setView} view={view} />
      <hr />
      {view === "index" ? (
        <>
          <SearchBar setView={setView} />
          <OrderList />
        </>
      ) : view === "orden" ? (
        <CreateOrder />
      ) : view === "viga" ? (
        <CreateViga />
      ) : null}
    </div>
  );
}
