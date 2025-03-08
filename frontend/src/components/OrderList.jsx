import React, { useEffect, useState } from "react";
import { Fecha, Orden, Vigas } from "./database.json";
import api from "./api";

export default function OrdenesList() {
  const [orden, setOrden] = useState([]);
  useEffect(() => {
    api
      .get("ordenes/")
      .then((response) => {
        setOrden(response.data.Ordenes);
      })
      .catch((error) => {
        console.error("Error al obtener las órdenes:", error);
      });
  }, []);
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {orden.length === 1 ? (
        <p className="text-gray-500 text-center">No se encontraron órdenes.</p>
      ) : (
        <div className="space-y-4">
          {orden.map((orden, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg bg-white"
            >
              <h2 className="text-lg font-bold text-blue-600">{orden.fecha}</h2>
              <div className="ml-4 mt-2">
                {orden.numerosOrden.map((numOrden, i) => (
                  <div key={i} className="border-l-4 border-blue-400 pl-3 mt-2">
                    <h3 className="text-md font-semibold text-gray-800">
                      Orden: {numOrden.numero}
                    </h3>
                    <ul className="ml-4 mt-1 list-disc text-gray-700">
                      {numOrden.vigas.map((viga, j) => (
                        <li key={j}>
                          <strong>{viga.nombre}</strong> = {viga.cantidad}{" "}
                          <span className="text-gray-500">
                            ({viga.medidas})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
