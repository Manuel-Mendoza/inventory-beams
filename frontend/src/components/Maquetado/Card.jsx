import React, { useState } from "react";
import Button from "./Button";
import { useApiContext } from "../../context/ApiContext";

export default function Card({ orden }) {
  const [toggler, setToggler] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { deleteOrden } = useApiContext();

  // Función para manejar el toggle
  const handleToggle = (index) => {
    setToggler(toggler === index ? null : index);
    setConfirmDelete(null);
  };

  // Función para manejar la eliminación
  const handleDelete = async (e, ordenId) => {
    e.stopPropagation();

    if (confirmDelete === ordenId) {
      try {
        await deleteOrden(ordenId);
        setConfirmDelete(null);
        setToggler(null);
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    } else {
      setConfirmDelete(ordenId);
    }
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
            <div className="toggle-content mt-3 p-3 bg-gray-50 rounded-md grid grid-cols-2 justify-items-center">
              <Button
              style={'!w-full mr-1'}
                bg={"gray"}
                name="editar"
                click={(e) => {
                  e.stopPropagation();
                  // Aquí iría la lógica para editar
                }}
              />
              <Button
              style={'!w-full ml-1'}
                bg={confirmDelete === data._id ? "yellow" : "red"}
                name={confirmDelete === data._id ? "confirmar" : "eliminar"}
                click={(e) => handleDelete(e, data._id)}
              />
              {/* Mensaje de confirmación */}
              {confirmDelete === data._id && (
                <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-center col-span-2">
                  ¿Estás seguro de eliminar esta orden? Haz clic en "confirmar"
                  para eliminar.
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
