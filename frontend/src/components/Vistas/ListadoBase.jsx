import React from 'react'

export default function ListadoBase({orden}) {
  return (
    <div className="space-y-4">
      {orden.map((data, index) => (
        <div
          key={index}
          className="border border-gray-300 p-2 rounded-lg bg-white"
        >
          <h2 className="text-lg font-bold text-blue-600">{data.fecha}</h2>
          <div className="ml-4 mt-2">
            <h3 className="text-md font-semibold text-gray-800">
              Orden: {data.numero_orden}
            </h3>
            <ul className="ml-2 mt-1 list-disc text-gray-700">
              {data.vigas.map((viga, j) => (
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
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
