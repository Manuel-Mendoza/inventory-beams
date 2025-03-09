import React, { useState } from "react";
import Letter from "./Letter";
import SearchBar from "./SearchBar";
import OrderList from "./OrderList";
import CreateOrder from "./CreateOrden";
import CreateViga from "./CreateVigas";

export default function Inicio() {
  const [view, setView] = useState("index");

  return (
    <div className="p-6 max-md:p-1">
      <Letter setView={setView} view={view} />
      <hr />
      {view === "index" ? (
          <OrderList setView={setView} />
      ) : view === "orden" ? (
        <CreateOrder />
      ) : view === "viga" ? (
        <CreateViga />
      ) : null}
    </div>
  );
}
