import React from "react";
import { Fecha, Orden, Vigas } from "./database.json";

export default function OrdenesList() {
  return (
    <div className="container grid md:grid-cols-2 p-1">
      {Fecha.map((data) => (
        <div className="p-2 m-2 bg-gray-50 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Asegúrate de que el JSON tenga solo un único objeto para cada campo */}
            <div className="border border-gray-300 p-4 rounded-lg bg-white">
              <h2 className="text-lg font-bold text-blue-600">
                {data.date} {/* Aquí se muestra la fecha */}
              </h2>
              <div className=" mt-2">
                <div className="border-l-4 border-blue-400 pl-3 mt-2">
                  <h3 className="text-md font-semibold text-gray-800">
                    Orden: {Orden.number}{" "}
                    {/* Aquí se muestra el número de orden */}
                  </h3>
                  <ul className="text-sm ml-3 mt-1 list-disc text-gray-700 md:text-base">
                    {Vigas.map((viga, i) => (
                      <li key={i}>
                        <strong>{viga.name}</strong> = {viga.quantity}{" "}
                        <span className="text-gray-500">
                          ({viga.length}' x {viga.width}" x {viga.height}" -{" "}
                          {viga.unit} unidades)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
