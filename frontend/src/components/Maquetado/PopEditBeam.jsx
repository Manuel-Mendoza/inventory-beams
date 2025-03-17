import { useApiContext } from "../../context/ApiContext";
import Button from "./Button";
import Input from "./Input";
import { useState, useEffect } from "react";

export default function PopEditBeam({ viga, orden }) {
  const { setEditarBeam, updateVigaQuantity } = useApiContext();
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    
    
  }, [viga, orden]);

  const handleSubmit = async () => {
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (!viga || !orden) {
      setError("No beam or order selected");
      return;
    }

    try {
      
      
      );
      
      await updateVigaQuantity(orden, viga, parseInt(cantidad));
      setEditarBeam(false);
    } catch (err) {
      setError(err.message || "Error updating beam");
    }
  };

  return (
    <div className="fixed bg-white/30 backdrop-blur-sm w-full h-full flex justify-center items-center z-10">
      <div className="grid grid-cols-2 gap-2 bg-gray-200 rounded-2xl p-10">
        <h1 className="text-2xl col-span-2">
          Edit Beam: {viga ? viga.nombre : "Not selected"}
        </h1>
        <p>How many beams were completed?</p>
        <Input
          placeholder="Qty"
          style={"!border-1 !bg-white-500 col-span-2"}
          type={"number"}
          inputmode={"numeric"}
          value={cantidad}
          onChange={(e) => {
            setCantidad(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-red-500 col-span-2">{error}</p>}
        <Button
          style={"!w-full"}
          name={"Cancel"}
          bg={"gray"}
          click={() => setEditarBeam(false)}
        />
        <Button 
          style={"!w-full"} 
          name={"Accept"} 
          click={handleSubmit}
        />
      </div>
    </div>
  );
}
