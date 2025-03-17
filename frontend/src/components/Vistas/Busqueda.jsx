import React from "react";
import Card from "../Maquetado/Card";

export default function BusquedaRealizada({ orden, setSelectedViga, setSelectedOrden }) {
  return <Card orden={orden} setSelectedViga={setSelectedViga} setSelectedOrden={setSelectedOrden} />;
}
