import React, { useState } from "react";
import Input from "./Maquetado/Input";
import Button from "./Maquetado/Button";

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
      <Input
        onChangeValue={(e) => setNumeroOrden(e.target.value)}
        placeholder="Número de Orden"
        type="number"
        style={"text-center"}
        inputmode={"numeric"}
      />

      {/* Agregar Vigas */}
      <div className="mb-4 min-md:grid justify-items-center grid-cols-5 gap-1">
        <h3 className="text-lg font-semibold col-span-5 text-center">
          Agregar Viga
        </h3>
        <div className="col-span-full">
          <Input
            placeholder="Nombre de la Viga"
            type="text"
            style={"text-center uppercase"}
          />
          <Input placeholder="Cantidad" type="number" inputmode={"numeric"} />
        </div>

        {medidas === 0 ? (
          <>
            <Input
              type="number"
              placeholder="Cara...(Pulgadas)"
              inputmode="numeric"
            />
            <form className="max-w-sm mx-auto">
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value=" " defaultValue>
                  Inches
                </option>
                <option value="1/8">1/8</option>
                <option value="1/4">1/4</option>
                <option value="3/8">3/8</option>
                <option value="1/2">1/2</option>
                <option value="5/8">5/8</option>
                <option value="3/4">3/4</option>
                <option value="7/8">7/8</option>
              </select>
            </form>

            <Input inputMode="numeric" placeholder="Cuerpo..." type="number" />

            <form className="max-w-sm mx-auto">
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value=" " defaultValue>
                  Inches
                </option>
                <option value="1/8">1/8</option>
                <option value="1/4">1/4</option>
                <option value="3/8">3/8</option>
                <option value="1/2">1/2</option>
                <option value="5/8">5/8</option>
                <option value="3/4">3/4</option>
                <option value="7/8">7/8</option>
              </select>
            </form>

            <Input
              placeholder="Largo... (feet)"
              type="number"
              inputmode={"numeric"}
            />
          </>
        ) : (
          <Input
            placeholder="medida... ejemplo: 3 1/2 x 11 7/8 x 60"
            type={"text"}
            style={"col-span-full"}
          />
        )}

        <div className="flex max-sm:flex-col col-span-full w-full justify-around">
          <Button name="Agregar Viga" style={"mb-1"} bg={"gray"} />

          {medidas === 1 ? (
            <Button
              bg={"gray"}
              name={"⬅️"}
              click={() => setMedidas(0)}
              style={"mb-1"}
            />
          ) : (
            <Button
              style={"mb-1"}
              bg={"gray"}
              name="Otras medidas"
              click={() => setMedidas(1)}
            />
          )}

          {/* Botón para Enviar la Orden */}
          <Button onClick={() => alert("Orden enviada")} name="Crear Orden" />
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
