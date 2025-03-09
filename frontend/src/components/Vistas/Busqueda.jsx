import React from "react";

export default function BusquedaRealizada({ orden }) {
  return (
    <div className="space-y-4">
      <div className="border border-gray-300 p-4 rounded-lg bg-white">
        <h2 className="text-lg font-bold text-blue-600">{orden.fecha}</h2>
        <div className="ml-4 mt-2">
          <h3 className="text-md font-semibold text-gray-800">
            Orden: {orden.numero_orden}
          </h3>
          <ul className="ml-4 mt-1 list-disc text-gray-700">
            {orden.vigas.forEach((element) => {
              <li>
                <strong>{element.nombre}</strong> = {element.cantidad}{" "}
                <span className="text-gray-500 italic">({element.medidas}) </span>
                <span className="text-sm text-gray-500">
                  {element.cada_una === "1" ? null : element.cada_una}{" "}
                </span>
                <span className="text-gray-500"># {element.tipo}</span>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
