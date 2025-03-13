import React, { useState } from "react";
import { ApiProvider } from "../context/ApiContext";

import Letter from "./Letter";
import OrderList from "./OrderList";
import CreateOrder from "./CreateOrden";

export default function Inicio() {
  const [view, setView] = useState("index");

  return (
    <ApiProvider>
      <div className="p-6 max-md:p-1">
        <Letter setView={setView} view={view} />
        <hr />
        {view === "index" ? (
          <OrderList setView={setView} />
        ) : view === "orden" ? (
          <CreateOrder />
        ) : null}
      </div>
    </ApiProvider>
  );
}
