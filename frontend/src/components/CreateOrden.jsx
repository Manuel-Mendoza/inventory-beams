import React, { useState } from "react";

export default function CrearOrden() {
  const [medidas, setMedidas] = useState(0);
  const [numeroOrden, setNumeroOrden] = useState("");
  const [vigas, setVigas] = useState([]);
  const [nuevaViga, setNuevaViga] = useState({
    nombre: "",
    cantidad: "",
    medidas: "",
  });

  const agregarViga = () => {
    if (nuevaViga.nombre && nuevaViga.cantidad && nuevaViga.medidas) {
      setVigas([...vigas, nuevaViga]);
      setNuevaViga({ nombre: "", cantidad: "", medidas: "" });
    }
  };

  const enviarOrden = () => {
    console.log("Orden Creada:", { numeroOrden, vigas });
    setNumeroOrden("");
    setVigas([]);
  };

  return (
    <div
      id="formCreateOrden"
      className="p-6 bg-white shadow-md rounded-lg grid justify-center justify-items-center"
    >
      <h2 className="text-xl font-bold mb-4 grid text-center">
        Crear Nueva Orden
      </h2>

      {/* Input de Número de Orden */}
      <input
        type="text"
        placeholder="Número de Orden"
        value={numeroOrden}
        className="p-2 border rounded mb-3 w-full min-md:w-1/2"
      />

      {/* Agregar Vigas */}
      <div className="mb-4 min-md:grid justify-items-center grid-cols-2 gap-1">
        <h3 className="text-lg font-semibold col-span-2 text-center">
          Agregar Viga
        </h3>
        <input
          type="text"
          placeholder="Nombre de la Viga"
          value={nuevaViga.nombre}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevaViga.cantidad}
          className="w-full p-2 border rounded mt-2"
        />

        {medidas === 0 ? (
          <>
            <div className="grid col-span-2 grid-cols-2 min-md:grid-cols-6 gap-2">
              <input
                placeholder="Cara...(Pulgadas)"
                className="w-full p-2 border rounded mt-2"
              />
              <form class="max-w-sm mx-auto">
                <label for="underline_select" class="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Inches</option>
                  <option value="1/8">1/8</option>
                  <option value="1/4">1/4</option>
                  <option value="3/8">3/8</option>
                  <option value="1/2">1/2</option>
                  <option value="5/8">5/8</option>
                  <option value="3/4">3/4</option>
                  <option value="7/8">7/8</option>
                </select>
              </form>

              <input
                placeholder="Cuerpo..."
                className="w-full p-2 border rounded mt-2"
              />

              <form class="max-w-sm mx-auto">
                <label for="underline_select" class="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Inches</option>
                  <option value="1/8">1/8</option>
                  <option value="1/4">1/4</option>
                  <option value="3/8">3/8</option>
                  <option value="1/2">1/2</option>
                  <option value="5/8">5/8</option>
                  <option value="3/4">3/4</option>
                  <option value="7/8">7/8</option>
                </select>
              </form>

              <input
                placeholder="Largo... (feet)"
                className="w-full p-2 border rounded mt-2"
              />
            </div>
          </>
        ) : (
          <input
            placeholder="medida... ejemplo: 3 1/2 x 11 7/8 x 60"
            className="w-full p-2 border rounded mt-2 col-span-2"
          />
        )}

        <div className="min-md:flex col-span-2 w-full">
          <button className="mt-3 bg-blue-500 text-white p-2 rounded w-full min-md:w-1/2 mx-1">
            Agregar Viga
          </button>
          {medidas === 1 ? (
            <button
              onClick={() => setMedidas(0)}
              className="mt-3 bg-gray-400 text-white p-2 rounded w-full min-md:w-1/2 mx-1"
            >
              volver a medidas definidas
            </button>
          ) : (
            <button
              onClick={() => setMedidas(1)}
              className="mt-3 bg-gray-400 text-white p-2 rounded w-full min-md:w-1/2 mx-1"
            >
              Otra medida
            </button>
          )}

          {/* Botón para Enviar la Orden */}
          <button className="mt-3 bg-green-500 text-white p-2 rounded w-full min-md:w-1/2 mx-1">
            Crear Orden
          </button>
        </div>
        {/* Lista de Vigas Agregadas */}
        <ul className="mb-4">
          {vigas.map((viga, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{viga.nombre}</strong> - {viga.cantidad} ({viga.medidas})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
