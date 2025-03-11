import React, { useState } from "react";
import Button from "./Button";

export default function Card({ orden }) {
  const [toggler, setToggler] = useState(null);

  // Función para manejar el toggle
  const handleToggle = (index) => {
    // Si el elemento clickeado ya está abierto, lo cerramos
    // Si no, abrimos el elemento clickeado
    setToggler(toggler === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {orden.map((data, index) => (
        <div
          id={index}
          key={index}
          className="border border-gray-300 p-2 rounded-lg bg-white"
        >
          {/* Cabecera clickeable para hacer toggle */}
          <div onClick={() => handleToggle(index)} className="cursor-pointer">
            <h2 className="text-lg font-bold text-blue-600">{data.fecha}</h2>
            <div className="ml-4 mt-2">
              <h3 className="text-md font-semibold text-gray-800">
                Orden: {data.numero_orden}
              </h3>
              <ul className="ml-2 mt-1 list-disc text-gray-700">
                {data.vigas.map((viga, j) => (
                  <li key={j}>
                    <strong className="uppercase">{viga.nombre}</strong> ={" "}
                    {viga.cantidad}{" "}
                    <span className="text-gray-500 italic">
                      ({viga.medidas}){" "}
                    </span>
                    <span className="text-sm text-gray-500">
                      {viga.cada_una === "1" ? null : viga.cada_una}{" "}
                    </span>
                    <span className="text-gray-500 uppercase">
                      # {viga.tipo}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenido que se muestra/oculta */}
          {toggler === index && (
            <div className="toggle-content mt-3 p-3 bg-gray-50 rounded-md flex justify-around">
              <Button
                bg={"gray"}
                name="editar"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <Button
                bg={"red"}
                name="eliminar"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
