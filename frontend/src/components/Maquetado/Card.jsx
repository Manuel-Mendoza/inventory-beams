import React, { useState } from "react";
import Button from "./Button";
import { useApiContext } from "../../context/ApiContext";

export default function Card({ orden, setSelectedViga, setSelectedOrden }) {
  const [toggler, setToggler] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedViga, setSelectedVigaLocal] = useState(null);
  const { deleteOrden, deleteViga, setEditarBeam } = useApiContext();

  // Function to handle toggle
  const handleToggle = (index) => {
    setToggler(toggler === index ? null : index);
    setConfirmDelete(null);
  };

  // Function to handle viga click
  const handleVigaClick = (e, viga, index) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setSelectedVigaLocal(viga);
    if (setSelectedViga) {
      setSelectedViga(viga);
    }
    handleToggle(index);
    console.log("Viga seleccionada:", viga.nombre);
  };

  // Function to handle deletion of a specific beam
  const handleDeleteViga = async (e, index) => {
    e.stopPropagation();

    // Get the current order and selected viga
    const currentOrden = orden[index];

    if (!selectedViga) {
      alert("Por favor selecciona una viga primero");
      return;
    }

    console.log(
      "Trying to delete beam:",
      selectedViga.nombre,
      "from order:",
      currentOrden.numero_orden
    );

    if (confirmDelete === index) {
      try {
        console.log("Confirmation received, proceeding to delete beam");
        await deleteViga(currentOrden, selectedViga);
        console.log("Beam deleted successfully");
        setConfirmDelete(null);
        setToggler(null);
        setSelectedVigaLocal(null);
        if (setSelectedViga) {
          setSelectedViga(null);
        }
      } catch (error) {
        console.error("Error deleting beam:", error);
        alert("Error al eliminar la viga: " + error.message);
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
          <div className="">
            <h2 className="text-lg font-bold text-blue-600">{data.fecha}</h2>
            <div className="ml-4 mt-2">
              <h3 className="text-md font-semibold text-gray-800">
                Order: {data.numero_orden}
              </h3>
              <ul className="ml-2 mt-1 list-disc text-gray-700">
                {data.vigas.map((viga, j) => (
                  <li
                    onClick={(e) => handleVigaClick(e, viga, index)}
                    key={j}
                    className={`bg-gray-100 mb-3 px-2 rounded cursor-pointer hover:bg-gray-200 transition-colors ${
                      selectedViga && selectedViga.nombre === viga.nombre
                        ? "border-2 border-green-500"
                        : ""
                    }`}
                  >
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
                {/* Content that is shown/hidden */}
                {toggler === index && (
                  <div className="toggle-content mt-3 p-3 bg-gray-50 rounded-md grid grid-cols-2 justify-items-center">
                    {selectedViga && (
                      <div className="col-span-2 flex flex-wrap justify-center items-center mb-2">
                        <p className="mr-2">Beam</p>
                        <h1 className="font-bold text-green-600 uppercase mx-2">
                          {selectedViga.nombre}
                        </h1>
                        <p className="ml-2">qty: {selectedViga.cantidad}</p>
                      </div>
                    )}
                    <Button
                      style={"!w-full mr-1"}
                      bg={"gray"}
                      name="edit"
                      click={(e) => {
                        e.stopPropagation();
                        if (setSelectedViga) {
                          setSelectedViga(selectedViga);
                        }
                        if (setSelectedOrden) {
                          setSelectedOrden(data);
                        }
                        console.log("Editando viga:", selectedViga);
                        console.log("De la orden:", data);
                        setEditarBeam(true);
                      }}
                    />
                    <Button
                      style={"!w-full ml-1"}
                      bg={confirmDelete === index ? "yellow" : "red"}
                      name={confirmDelete === index ? "confirm" : "delete beam"}
                      id={`delete-${index}`}
                      click={(e) => {
                        e.stopPropagation();
                        handleDeleteViga(e, index);
                      }}
                    />
                    {/* Confirmation message */}
                    {confirmDelete === index && (
                      <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-center col-span-2">
                        ¿Estás seguro de que quieres eliminar esta viga? Haz
                        clic en "confirm" para eliminar.
                      </div>
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
