import { useApiContext } from "../../context/ApiContext";
import Button from "./Button";
import Input from "./Input";

export default function PopEditBeam() {
  const { setEditarBeam } = useApiContext();
  return (
    <div className="fixed bg-white/30 backdrop-blur-sm w-full h-full flex justify-center items-center z-10">
      <div className="grid grid-cols-2 gap-2 bg-gray-200 rounded p-10">
        <h1 className="text-2xl col-span-2">Editar Viga (Nombre de la Viga)</h1>
        <Input
          placeholder="Qty"
          style={"!border-1 !bg-white-500 col-span-2"}
          type={"number"}
          inputmode={"numeric"}
        />
        <Button
          style={"!w-full"}
          name={"Cancelar"}
          bg={"gray"}
          click={() => setEditarBeam(false)}
        />
        <Button style={"!w-full"} name={"Aceptar"} />
      </div>
    </div>
  );
}
