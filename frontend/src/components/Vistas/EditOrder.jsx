import React, { useState, useEffect } from "react";
import ListadoBase from "./ListadoBase";
import { useApiContext } from "../../context/ApiContext";
import Button from "../Maquetado/Button";
import Input from "../Maquetado/Input";

export default function EditOrder() {
  const { orden, fetchOrdenes, updateOrden, updateViga, loading } = useApiContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedViga, setSelectedViga] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingViga, setIsEditingViga] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Estado para editar la orden
  const [editedOrder, setEditedOrder] = useState({
    numero_orden: "",
    fecha: "",
    vigas: []
  });
  
  // Estado para editar una viga
  const [editedViga, setEditedViga] = useState({
    nombre: "",
    cantidad: 0,
    medidas: "",
    tipo: "DF",
    cada_una: "0"
  });
  
  // Actualizar el estado editedOrder cuando se selecciona una orden
  useEffect(() => {
    if (selectedOrder) {
      setEditedOrder({
        id: selectedOrder.id,
        numero_orden: selectedOrder.numero_orden,
        fecha: selectedOrder.fecha,
        vigas: [...selectedOrder.vigas]
      });
    }
  }, [selectedOrder]);
  
  // Actualizar el estado editedViga cuando se selecciona una viga
  useEffect(() => {
    if (selectedViga) {
      setEditedViga({
        ...selectedViga
      });
    }
  }, [selectedViga]);
  
  // Función para buscar órdenes
  const handleSearch = () => {
    fetchOrdenes(searchTerm);
  };

  // Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchOrdenes();
  };

  // Función para seleccionar una orden para editar
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  // Función para volver a la lista de órdenes
  const handleBackToList = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setSelectedViga(null);
    setIsEditingViga(false);
    setError("");
    setSuccess("");
  };
  
  // Función para guardar los cambios de la orden
  const handleSaveOrder = async () => {
    try {
      setError("");
      
      // Validaciones básicas
      if (!editedOrder.numero_orden.trim()) {
        setError("El número de orden es obligatorio");
        return;
      }
      
      if (!editedOrder.fecha.trim()) {
        setError("La fecha es obligatoria");
        return;
      }
      
      // Guardar los cambios
      await updateOrden(editedOrder.id, editedOrder);
      setSuccess("Orden actualizada correctamente");
      
      // Actualizar la orden seleccionada con los nuevos datos
      setSelectedOrder(editedOrder);
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error al guardar los cambios");
    }
  };
  
  // Función para editar una viga
  const handleEditViga = (viga) => {
    setSelectedViga(viga);
    setIsEditingViga(true);
  };
  
  // Función para guardar los cambios de la viga
  const handleSaveViga = async () => {
    try {
      setError("");
      
      // Validaciones básicas
      if (!editedViga.nombre.trim()) {
        setError("El nombre de la viga es obligatorio");
        return;
      }
      
      if (isNaN(editedViga.cantidad) || editedViga.cantidad <= 0) {
        setError("La cantidad debe ser un número mayor que cero");
        return;
      }
      
      if (!editedViga.medidas.trim()) {
        setError("Las medidas son obligatorias");
        return;
      }
      
      // Guardar los cambios
      await updateViga(selectedOrder, selectedViga, editedViga);
      
      // Actualizar la lista de vigas en la orden editada
      const updatedVigas = editedOrder.vigas.map(viga => 
        viga.nombre === selectedViga.nombre && viga.medidas === selectedViga.medidas
          ? editedViga
          : viga
      );
      
      setEditedOrder({
        ...editedOrder,
        vigas: updatedVigas
      });
      
      setSuccess("Viga actualizada correctamente");
      setIsEditingViga(false);
      
      // Actualizar la viga seleccionada con los nuevos datos
      setSelectedViga(editedViga);
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error al guardar los cambios de la viga");
    }
  };
  
  // Función para cancelar la edición de la viga
  const handleCancelEditViga = () => {
    setIsEditingViga(false);
    setEditedViga({...selectedViga});
    setError("");
  };

  return (
    <div className="space-y-4">
      <br />
      <h1 className="text-xl text-center font-bold">Editar Órdenes</h1>
      <br />
      
      {/* Barra de búsqueda (solo visible cuando no estamos editando) */}
      {!isEditing && (
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Buscar por número de orden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style="flex-grow"
          />
          <Button 
            name="Buscar" 
            click={handleSearch}
            style="!px-4"
          />
          <Button 
            name="Limpiar" 
            bg="gray" 
            click={handleClearSearch}
            style="!px-4"
          />
        </div>
      )}
      
      {/* Mensajes de error y éxito */}
      {error && (
        <div className="bg-red-50 p-3 rounded-md text-red-800 mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 p-3 rounded-md text-green-800 mb-4">
          {success}
        </div>
      )}
      
      {/* Instrucciones (solo visibles cuando no estamos editando) */}
      {!isEditing && (
        <div className="bg-blue-50 p-3 rounded-md text-blue-800 mb-4">
          <p>Selecciona una orden para ver sus detalles y editarla.</p>
          <p className="text-sm mt-1">Puedes buscar por número de orden para encontrar órdenes específicas.</p>
        </div>
      )}
      
      {/* Indicador de carga global */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Cargando...</p>
        </div>
      )}
      
      {/* Lista de órdenes */}
      {!isEditing ? (
        <div>
          {orden.length > 0 ? (
            <>
              <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 mb-4">
                <p>Haz clic en cualquier orden para editarla.</p>
              </div>
              <ListadoBase 
                orden={orden} 
                edit={true}
                setSelectedViga={setSelectedViga}
                setSelectedOrden={handleSelectOrder}
              />
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No se encontraron órdenes. Intenta con otra búsqueda.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Botón para volver a la lista */}
          <Button 
            name="← Volver a la lista" 
            bg="gray" 
            click={handleBackToList}
            style="!mb-4"
          />
          
          {/* Formulario de edición de orden */}
          {!isEditingViga ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Editar Orden</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Orden
                  </label>
                  <Input
                    value={editedOrder.numero_orden}
                    onChange={(e) => setEditedOrder({
                      ...editedOrder,
                      numero_orden: e.target.value
                    })}
                    placeholder="Número de orden"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <Input
                    value={editedOrder.fecha}
                    onChange={(e) => setEditedOrder({
                      ...editedOrder,
                      fecha: e.target.value
                    })}
                    placeholder="Fecha (YYYY-MM-DD)"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mb-6">
                <Button
                  name="Guardar Cambios"
                  click={handleSaveOrder}
                />
              </div>
              
              {/* Lista de vigas en la orden */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Vigas en esta orden:</h3>
                {editedOrder.vigas && editedOrder.vigas.length > 0 ? (
                  <div className="space-y-2">
                    {editedOrder.vigas.map((viga, index) => (
                      <div 
                        key={index} 
                        className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium uppercase">{viga.nombre}</p>
                            <div className="text-sm text-gray-600 mt-1">
                              <p>Cantidad: {viga.cantidad} | Tipo: {viga.tipo} | Medidas: {viga.medidas}</p>
                              {viga.cada_una !== "0" && viga.cada_una !== "1" && (
                                <p>Cada una: {viga.cada_una}/bms</p>
                              )}
                            </div>
                          </div>
                          <Button
                            name="Editar"
                            bg="blue"
                            style="!px-3 !py-1 text-sm"
                            click={() => handleEditViga(viga)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No hay vigas en esta orden.</p>
                )}
              </div>
            </div>
          ) : (
            /* Formulario de edición de viga */
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Editar Viga</h2>
                <Button
                  name="Volver a la Orden"
                  bg="gray"
                  style="!px-3 !py-1 text-sm"
                  click={handleCancelEditViga}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <Input
                    value={editedViga.nombre}
                    onChange={(e) => setEditedViga({
                      ...editedViga,
                      nombre: e.target.value
                    })}
                    placeholder="Nombre de la viga"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <Input
                    value={editedViga.cantidad}
                    onChange={(e) => setEditedViga({
                      ...editedViga,
                      cantidad: parseInt(e.target.value) || 0
                    })}
                    type="number"
                    placeholder="Cantidad"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medidas
                  </label>
                  <Input
                    value={editedViga.medidas}
                    onChange={(e) => setEditedViga({
                      ...editedViga,
                      medidas: e.target.value
                    })}
                    placeholder="Medidas"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={editedViga.tipo}
                    onChange={(e) => setEditedViga({
                      ...editedViga,
                      tipo: e.target.value
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="DF">DF</option>
                    <option value="YC">YC</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cada Una
                  </label>
                  <Input
                    value={editedViga.cada_una}
                    onChange={(e) => setEditedViga({
                      ...editedViga,
                      cada_una: e.target.value
                    })}
                    placeholder="Cada una (opcional)"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button
                  name="Guardar Viga"
                  click={handleSaveViga}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
