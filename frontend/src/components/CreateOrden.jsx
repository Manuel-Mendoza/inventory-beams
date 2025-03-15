import React, { useState } from "react";
import Input from "./Maquetado/Input";
import Button from "./Maquetado/Button";
import { useApiContext } from "../context/ApiContext";

export default function CrearOrden() {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const fechaFormateada = `${año}-${mes}-${dia}`; // Format YYYY-MM-DD
  const { createOrden } = useApiContext();
  const [medidas, setMedidas] = useState({
    cara: "",
    cara_inches: "",
    cuerpo: "",
    cuerpo_inches: "",
    largo: "",
    otra: "",
  });
  const [otra, setOtra] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [numeroOrden, setNumeroOrden] = useState("");
  const [tipo, setTipo] = useState("");
  const [cu, setCu] = useState(0);
  const [vigas, setVigas] = useState([]);
  const [date, setDate] = useState(fechaFormateada);

  const agregarViga = () => {
    // Check if we have the necessary data
    if (!nombre || !cantidad) {
      alert("Please enter name and quantity");
      return;
    }

    // Create the measurement string according to the selected mode
    let medidaString = "";
    if (otra === 0) {
      // Check that we have all the necessary measurements
      if (!medidas.cara || !medidas.cuerpo || !medidas.largo) {
        alert("Please complete all measurements");
        return;
      }
      medidaString = `${medidas.cara} ${medidas.cara_inches} x ${medidas.cuerpo} ${medidas.cuerpo_inches} x ${medidas.largo}`;
    } else {
      // Check that we have the alternative measurement
      if (!medidas.otra) {
        alert("Please enter the measurement");
        return;
      }
      medidaString = medidas.otra;
    }

    // Create the new beam and add it to the array
    const nuevaViga = {
      nombre,
      cantidad,
      medidas: medidaString,
      cu,
      tipo,
    };

    setVigas([...vigas, nuevaViga]);
    console.log("New Beam:", nuevaViga);

    // Clear fields after adding
    setNombre("");
    setCantidad("");
    setTipo("");
    setCu(0);
    setMedidas({
      cara: "",
      cara_inches: "",
      cuerpo: "",
      cuerpo_inches: "",
      largo: "",
      cu: 0,
      tipo: "",
      otra: "",
    });
  };

  const enviarOrden = async () => {
    if (vigas.length === 0) {
      alert("Add at least one beam before creating the order");
      return;
    }
  
    if (!numeroOrden) {
      alert("Please enter an order number");
      return;
    }
  
    try {
      // Create the order object with the correct format
      const ordenData = {
        numero_orden: numeroOrden,
        fecha: date,
        vigas: vigas.map(viga => ({
          nombre: viga.nombre,
          cantidad: parseInt(viga.cantidad),
          medidas: viga.medidas,
          cada_una: viga.cu.toString(), // Convert to string as expected by the model
          tipo: viga.tipo
        }))
      };
  
      await createOrden(ordenData);
      alert("Order created successfully");
  
      // Clear the form
      setNumeroOrden("");
      setVigas([]);
      setDate(fechaFormateada);
    } catch (error) {
      alert("Error creating order: " + error.message);
      console.error("Detailed error:", error);
    }
  };

  return (
    <div
      id="formCreateOrden"
      className="p-6 bg-white shadow-md rounded-lg grid justify-center justify-items-center"
    >
      <h2 className="text-xl font-bold mb-4 grid text-center">
        Create New Order
      </h2>
      <div className="flex justify-around w-full">
        {/* Date Input */}
        <Input
          placeholder="Date"
          type="date"
          style={"text-center"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Order Number Input */}
        <Input
          onChange={(e) => setNumeroOrden(e.target.value)}
          placeholder="Order Number"
          type="number"
          style={"text-center"}
          inputmode={"numeric"}
          value={numeroOrden}
        />
      </div>

      {/* Add Beams */}
      <div className="mb-4 min-md:grid justify-items-center grid-cols-5 gap-1">
        <h3 className="text-lg font-semibold col-span-5 text-center">
          Add Beam
        </h3>
        <div className="col-span-full">
          <Input
            placeholder="Beam number"
            type="text"
            style={"text-center uppercase mb-3"}
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <Input
            style={"mb-3 text-center"}
            placeholder="Quantity"
            type="number"
            inputmode={"numeric"}
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
          />
        </div>

        {otra === 0 ? (
          <>
            <Input
              style={"mb-3"}
              type="number"
              placeholder="Face...(Inches)"
              inputmode="numeric"
              onChange={(e) =>
                setMedidas((pre) => ({ ...pre, cara: e.target.value }))
              }
              value={medidas.cara}
            />
            <form className="max-w-sm mx-auto">
              <label htmlFor="cara_inches" className="sr-only">
                Inches
              </label>
              <select
                onChange={(e) =>
                  setMedidas((pre) => ({ ...pre, cara_inches: e.target.value }))
                }
                id="cara_inches"
                value={medidas.cara_inches}
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
              style={"mb-3"}
              inputmode="numeric"
              placeholder="Body..."
              type="number"
              onChange={(e) =>
                setMedidas((pre) => ({ ...pre, cuerpo: e.target.value }))
              }
              value={medidas.cuerpo}
            />

            <form className="max-w-sm mx-auto">
              <label htmlFor="cuerpo_inches" className="sr-only">
                Inches
              </label>
              <select
                id="cuerpo_inches"
                value={medidas.cuerpo_inches}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={(e) =>
                  setMedidas((pre) => ({
                    ...pre,
                    cuerpo_inches: e.target.value,
                  }))
                }
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
              placeholder="Length... (feet)"
              style={"mb-3"}
              type="number"
              inputmode={"numeric"}
              onChange={(e) =>
                setMedidas((pre) => ({ ...pre, largo: e.target.value }))
              }
              value={medidas.largo}
            />
          </>
        ) : (
          <Input
            onChange={(e) =>
              setMedidas((pre) => ({ ...pre, otra: e.target.value }))
            }
            placeholder="measurement... example: 3 1/2 x 11 7/8 x 60"
            type={"text"}
            style={"col-span-full"}
            value={medidas.otra}
          />
        )}
        <Input
          value={cu}
          placeholder={"each"}
          type={"number"}
          inputmode={"numeric"}
          style={"col-span-2 text-center mb-3"}
          onChange={(e) => setCu(e.target.value)}
        />
        <Input
          value={tipo}
          placeholder={"Type"}
          type={"text"}
          style={"col-span-2 col-start-4 text-center mb-3"}
          onChange={(e) => setTipo(e.target.value)}
        />
        <br />
        <div className="flex max-sm:flex-col col-span-full w-full justify-around">
          <Button
            name="Add Beam"
            style={"mb-1"}
            bg={"blue"}
            click={agregarViga}
          />

          {otra === 1 ? (
            <Button
              bg={"gray"}
              name={"⬅️"}
              click={() => setOtra(0)}
              style={"mb-1"}
            />
          ) : (
            <Button
              style={"mb-1"}
              bg={"gray"}
              name="Other measurements"
              click={() => setOtra(1)}
            />
          )}

          {/* Button to Submit the Order */}
          <Button click={enviarOrden} name="Create Order" />
        </div>
        <hr />
        {/* List of Added Beams */}
        <table className="mb-4 col-span-full w-full">
          <thead>
            <tr className="p-2 border-b ">
              <th className="text">Bms</th>
              <th className="text">Qty</th>
              <th className="text">Size</th>
              <th className="text">Each</th>
              <th className="text">DF/YC</th>
            </tr>
          </thead>
          <tbody>
            {vigas.map((viga, index) => (
              <tr key={index} className="p-2 border-b text-center text-sm">
                <td className="uppercase text-green-500 font-bold">
                  {viga.nombre}
                </td>
                <td className="text">{viga.cantidad}</td>
                <td className="text">({viga.medidas})</td>
                <td className="text">
                  {viga.cu === "0" ? "whole" : <p>{viga.cu}/bms</p>}
                </td>
                <td className="text uppercase">{viga.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
