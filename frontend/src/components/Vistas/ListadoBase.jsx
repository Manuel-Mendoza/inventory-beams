import React from "react";
import Card from "../Maquetado/Card";

export default function ListadoBase({
  orden,
  setSelectedViga,
  setSelectedOrden,
  edit,
}) {
  return (
    <Card
      edit={edit}
      orden={orden}
      setSelectedViga={setSelectedViga}
      setSelectedOrden={setSelectedOrden}
    />
  );
}
