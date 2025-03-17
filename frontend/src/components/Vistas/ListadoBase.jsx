import React from "react";
import Card from "../Maquetado/Card";

export default function ListadoBase({ orden, setSelectedViga, setSelectedOrden }) {
  return <Card orden={orden} setSelectedViga={setSelectedViga} setSelectedOrden={setSelectedOrden} />;
}
