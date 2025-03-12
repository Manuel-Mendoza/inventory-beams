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
  const handleDelete = async (e, index) => {
    e.stopPropagation();
    
    // Obtener la orden actual basada en el índice
    const currentOrden = orden[index];
    
    console.log("Intentando eliminar orden:", currentOrden);

    if (confirmDelete === index) {
      try {
        console.log("Confirmación recibida, procediendo a eliminar");
        // Pasamos el objeto completo de la orden para tener acceso a todos sus datos
        await deleteOrden(currentOrden);
        console.log("Orden eliminada exitosamente");
        setConfirmDelete(null);
        setToggler(null);
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
        alert("Error al eliminar la orden: " + error.message);
      }
    } else {
      console.log("Primera pulsación, solicitando confirmación");
      setConfirmDelete(index);
    }
  };

  return (
    <div className="space-y-4">
      {orden.map((data, index) => (
        <div
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
                bg={confirmDelete === index ? "yellow" : "red"}
                name={confirmDelete === index ? "confirmar" : "eliminar"}
                id={`delete-${index}`}
                click={(e) => {
                  e.stopPropagation();
                  handleDelete(e, index);
                }}
              />
              {/* Mensaje de confirmación */}
              {confirmDelete === index && (
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