import React from "react";

export default function BusquedaRealizada({ orden }) {
  // Verificar si orden es un array y manejarlo adecuadamente
  if (Array.isArray(orden)) {
    return (
      <div className="space-y-4">
        {orden.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg bg-white">
            <h2 className="text-lg font-bold text-blue-600">{item.fecha}</h2>
            <div className="ml-4 mt-2">
              <h3 className="text-md font-semibold text-gray-800">
                Orden: {item.numero_orden}
              </h3>
              <ul className="ml-4 mt-1 list-disc text-gray-700">
                {Array.isArray(item.vigas) ? (
                  item.vigas.map((viga, j) => (
                    <li key={j}>
                      <strong>{viga.nombre}</strong> = {viga.cantidad}{" "}
                      <span className="text-gray-500 italic">
                        ({viga.medidas}){" "}
                      </span>
                      <span className="text-sm text-gray-500">
                        {viga.cada_una === "1" ? null : viga.cada_una}{" "}
                      </span>
                      <span className="text-gray-500"># {viga.tipo}</span>
                    </li>
                  ))
                ) : (
                  <p>{item.vigas?.nombre || "No hay información de vigas"}</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    // Manejar el caso de un solo objeto
    return (
      <div className="space-y-4">
        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h2 className="text-lg font-bold text-blue-600">{orden.fecha}</h2>
          <div className="ml-4 mt-2">
            <h3 className="text-md font-semibold text-gray-800">
              Orden: {orden.numero_orden}
            </h3>
            <ul className="ml-4 mt-1 list-disc text-gray-700">
              {Array.isArray(orden.vigas) ? (
                orden.vigas.map((viga, j) => (
                  <li key={j}>
                    <strong>{viga.nombre}</strong> = {viga.cantidad}{" "}
                    <span className="text-gray-500 italic">
                      ({viga.medidas}){" "}
                    </span>
                    <span className="text-sm text-gray-500">
                      {viga.cada_una === "1" ? null : viga.cada_una}{" "}
                    </span>
                    <span className="text-gray-500"># {viga.tipo}</span>
                  </li>
                ))
              ) : (
                <p>{orden.vigas?.nombre || "No hay información de vigas"}</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  }
