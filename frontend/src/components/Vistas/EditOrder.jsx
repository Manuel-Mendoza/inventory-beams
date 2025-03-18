import React, { useState, useEffect } from "react";
import ListadoBase from "./ListadoBase";
import { useApiContext } from "../../context/ApiContext";
import Button from "../Maquetado/Button";
import Input from "../Maquetado/Input";

export default function EditOrder() {
  const { orden, fetchOrdenes, updateOrden, updateViga, loading } =
    useApiContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedViga, setSelectedViga] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingViga, setIsEditingViga] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State for editing the order
  const [editedOrder, setEditedOrder] = useState({
    numero_orden: "",
    fecha: "",
    vigas: [],
  });

  // State for editing a beam
  const [editedViga, setEditedViga] = useState({
    nombre: "",
    cantidad: 0,
    medidas: "",
    tipo: "DF",
    cada_una: "0",
  });

  // Update editedOrder state when an order is selected
  useEffect(() => {
    if (selectedOrder) {
      setEditedOrder({
        id: selectedOrder.id,
        numero_orden: selectedOrder.numero_orden,
        fecha: selectedOrder.fecha,
        vigas: [...selectedOrder.vigas],
      });
    }
  }, [selectedOrder]);

  // Update editedViga state when a beam is selected
  useEffect(() => {
    if (selectedViga) {
      setEditedViga({
        ...selectedViga,
      });
    }
  }, [selectedViga]);

  // Function to search orders
  const handleSearch = () => {
    fetchOrdenes(searchTerm);
  };

  // Function to clear the search
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchOrdenes();
  };

  // Function to select an order for editing
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  // Function to return to the order list
  const handleBackToList = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setSelectedViga(null);
    setIsEditingViga(false);
    setError("");
    setSuccess("");
  };

  // Function to save order changes
  const handleSaveOrder = async () => {
    try {
      setError("");

      // Basic validations
      if (!editedOrder.numero_orden.trim()) {
        setError("Order number is required");
        return;
      }

      if (!editedOrder.fecha.trim()) {
        setError("Date is required");
        return;
      }

      // Save changes
      await updateOrden(editedOrder.id, editedOrder);
      setSuccess("Order updated successfully");

      // Update the selected order with new data
      setSelectedOrder(editedOrder);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error saving changes");
    }
  };

  // Function to edit a beam
  const handleEditViga = (viga) => {
    setSelectedViga(viga);
    setIsEditingViga(true);
  };

  // Function to save beam changes
  const handleSaveViga = async () => {
    try {
      setError("");

      // Basic validations
      if (!editedViga.nombre.trim()) {
        setError("Beam name is required");
        return;
      }

      if (isNaN(editedViga.cantidad) || editedViga.cantidad <= 0) {
        setError("Quantity must be a number greater than zero");
        return;
      }

      if (!editedViga.medidas.trim()) {
        setError("Measurements are required");
        return;
      }

      // Save changes
      await updateViga(selectedOrder, selectedViga, editedViga);

      // Update the list of beams in the edited order
      const updatedVigas = editedOrder.vigas.map((viga) =>
        viga.nombre === selectedViga.nombre &&
        viga.medidas === selectedViga.medidas
          ? editedViga
          : viga
      );

      setEditedOrder({
        ...editedOrder,
        vigas: updatedVigas,
      });

      setSuccess("Beam updated successfully");
      setIsEditingViga(false);

      // Update the selected beam with new data
      setSelectedViga(editedViga);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error saving beam changes");
    }
  };

  // Function to cancel beam editing
  const handleCancelEditViga = () => {
    setIsEditingViga(false);
    setEditedViga({ ...selectedViga });
    setError("");
  };

  return (
    <div className="space-y-4">
      <br />
      <h1 className="text-xl text-center font-bold">Edit Orders</h1>
      <br />

      {/* Search bar (only visible when not editing) */}
      {!isEditing && (
        <div className="flex space-x-2 mb-4">
          <Input
            style="!border-1 flex-grow"
            placeholder="Search by order number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button name="Search" click={handleSearch} style="!px-4" />
          <Button
            name="Clear"
            bg="gray"
            click={handleClearSearch}
            style="!px-4"
          />
        </div>
      )}

      {/* Error and success messages */}
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

      {/* Instructions (only visible when not editing) */}
      {!isEditing && (
        <div className="bg-blue-50 p-3 rounded-md text-blue-800 mb-4">
          <p>Select an order to view its details and edit it.</p>
          <p className="text-sm mt-1">
            You can search by order number to find specific orders.
          </p>
        </div>
      )}

      {/* Global loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {/* Order list */}
      {!isEditing ? (
        <div>
          {orden.length > 0 ? (
            <>
              <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 mb-4">
                <p>Click on any order to edit it.</p>
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
              No orders found. Try another search.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Button to return to the list */}
          <Button
            name="← Back to list"
            bg="gray"
            click={handleBackToList}
            style="!mb-4"
          />

          {/* Order editing form */}
          {!isEditingViga ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Edit Order</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <Input
                    style="!border-1"
                    value={editedOrder.numero_orden}
                    onChange={(e) =>
                      setEditedOrder({
                        ...editedOrder,
                        numero_orden: e.target.value,
                      })
                    }
                    placeholder="Order number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    style="!border-1"
                    value={editedOrder.fecha}
                    onChange={(e) =>
                      setEditedOrder({
                        ...editedOrder,
                        fecha: e.target.value,
                      })
                    }
                    placeholder="Date (YYYY-MM-DD)"
                  />
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <Button name="Save Changes" click={handleSaveOrder} />
              </div>

              {/* List of beams in the order */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Beams in this order:</h3>
                {editedOrder.vigas && editedOrder.vigas.length > 0 ? (
                  <div className="space-y-2">
                    {editedOrder.vigas.map((viga, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium uppercase">
                              {viga.nombre}
                            </p>
                            <div className="text-sm text-gray-600 mt-1">
                              <p>
                                Quantity: {viga.cantidad} | Type: {viga.tipo} |
                                Measurements: {viga.medidas}
                              </p>
                              {viga.cada_una !== "0" &&
                                viga.cada_una !== "1" && (
                                  <p>Each: {viga.cada_una}/bms</p>
                                )}
                            </div>
                          </div>
                          <Button
                            name="Edit"
                            bg="blue"
                            style="!px-3 !py-1 text-sm"
                            click={() => handleEditViga(viga)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No beams in this order.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Beam editing form */
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Edit Beam</h2>
                <Button
                  name="Back to Order"
                  bg="gray"
                  style="!px-3 !py-1 text-sm"
                  click={handleCancelEditViga}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    style="!border-1"
                    value={editedViga.nombre}
                    onChange={(e) =>
                      setEditedViga({
                        ...editedViga,
                        nombre: e.target.value,
                      })
                    }
                    placeholder="Beam name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <Input
                    style="!border-1"
                    value={editedViga.cantidad}
                    onChange={(e) =>
                      setEditedViga({
                        ...editedViga,
                        cantidad: parseInt(e.target.value) || 0,
                      })
                    }
                    type="number"
                    placeholder="Quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Measurements
                  </label>
                  <Input
                    style="!border-1"
                    value={editedViga.medidas}
                    onChange={(e) =>
                      setEditedViga({
                        ...editedViga,
                        medidas: e.target.value,
                      })
                    }
                    placeholder="Measurements"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={editedViga.tipo}
                    onChange={(e) =>
                      setEditedViga({
                        ...editedViga,
                        tipo: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="DF">DF</option>
                    <option value="YC">YC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Each
                  </label>
                  <Input
                    style="!border-1"
                    value={editedViga.cada_una}
                    onChange={(e) =>
                      setEditedViga({
                        ...editedViga,
                        cada_una: e.target.value,
                      })
                    }
                    placeholder="Each (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button name="Save Beam" click={handleSaveViga} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
