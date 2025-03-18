import React, { useState } from "react";
import { ApiProvider, useApiContext } from "../context/ApiContext";
import Letter from "./Letter";
import OrderList from "./OrderList";
import CreateOrder from "./CreateOrden";
import PopEditBeam from "./Maquetado/PopEditBeam";
import EditOrder from "./Vistas/EditOrder";

// Componente interno que usa el contexto
function IndexContent() {
  const [view, setView] = useState("index");
  const { editarBeam } = useApiContext();
  const [selectedViga, setSelectedViga] = useState(null);
  const [selectedOrden, setSelectedOrden] = useState(null);

  return (
    <>
      {editarBeam && selectedViga && selectedOrden && (
        <PopEditBeam viga={selectedViga} orden={selectedOrden} />
      )}
      <div className="p-6 max-md:p-1">
        <Letter setView={setView} view={view} />
        <hr />
        {view === "index" ? (
          <OrderList
            setView={setView}
            setSelectedViga={setSelectedViga}
            setSelectedOrden={setSelectedOrden}
          />
        ) : view === "orden" ? (
          <CreateOrder />
        ) : view === "edit" ? (
          <EditOrder />
        ) : null}
      </div>
    </>
  );
}

// Componente principal que proporciona el contexto
export default function Inicio() {
  return (
    <ApiProvider>
      <IndexContent />
    </ApiProvider>
  );
}
