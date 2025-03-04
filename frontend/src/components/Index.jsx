import React, { useState } from "react";
import Letter from "./Letter";
import SearchBar from "./SearchBar";
import OrderList from "./OrderList";

export default function Inicio() {
  const [view, setView] = useState("inicio");
  return (
    <div className="p-6">
      {view === "inicio" && (
        <div className="p-4 bg-gray-100 rounded">
          <h2>Vista 1</h2>
          <p>Contenido de la primera vista.</p>
        </div>
      )}
      {view === "vista2" && (
        <div className="p-4 bg-gray-100 rounded">
          <h2>Vista 2</h2>
          <p>Contenido de la primera vista.</p>
        </div>
      )}
      <Letter />
      <SearchBar setView={setView} />
      <OrderList />
    </div>
  );
}
