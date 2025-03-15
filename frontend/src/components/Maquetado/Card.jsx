import React, { useState } from "react";
import Button from "./Button";
import { useApiContext } from "../../context/ApiContext";

export default function Card({ orden }) {
  const [toggler, setToggler] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { deleteOrden } = useApiContext();

  // Function to handle toggle
  const handleToggle = (index) => {
    setToggler(toggler === index ? null : index);
    setConfirmDelete(null);
  };

  // Function to handle deletion
  const handleDelete = async (e, index) => {
    e.stopPropagation();
    
    // Get the current order based on the index
    const currentOrden = orden[index];
    
    console.log("Trying to delete order:", currentOrden);

    if (confirmDelete === index) {
      try {
        console.log("Confirmation received, proceeding to delete");
        // We pass the complete order object to have access to all its data
        await deleteOrden(currentOrden);
        console.log("Order deleted successfully");
        setConfirmDelete(null);
        setToggler(null);
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error deleting order: " + error.message);
      }
    } else {
      console.log("First click, requesting confirmation");
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
          {/* Clickable header to toggle */}
          <div onClick={() => handleToggle(index)} className="cursor-pointer">
            <h2 className="text-lg font-bold text-blue-600">{data.fecha}</h2>
            <div className="ml-4 mt-2">
              <h3 className="text-md font-semibold text-gray-800">
                Order: {data.numero_orden}
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

          {/* Content that is shown/hidden */}
          {toggler === index && (
            <div className="toggle-content mt-3 p-3 bg-gray-50 rounded-md grid grid-cols-2 justify-items-center">
              <Button
                style={'!w-full mr-1'}
                bg={"gray"}
                name="edit"
                click={(e) => {
                  e.stopPropagation();
                  // Here would go the logic to edit
                }}
              />
              <Button
                style={'!w-full ml-1'}
                bg={confirmDelete === index ? "yellow" : "red"}
                name={confirmDelete === index ? "confirm" : "delete"}
                id={`delete-${index}`}
                click={(e) => {
                  e.stopPropagation();
                  handleDelete(e, index);
                }}
              />
              {/* Confirmation message */}
              {confirmDelete === index && (
                <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-center col-span-2">
                  Are you sure you want to delete this order? Click "confirm" to delete.
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}