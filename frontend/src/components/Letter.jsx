import React from "react";

export default function Letter({ setView, view }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Inventory Beams</h1>
      {view === "index" ? null : (
        <span className="cursor-pointer" onClick={() => setView("index")}>
          ⬅️
        </span>
      )}
    </div>
  );
}
