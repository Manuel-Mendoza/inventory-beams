import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const API_BASE = "https://vigasapp-production.up.railway.app/api/";
const API_Desarrolo = "https://localhost:8000/api/";
const ApiContext = createContext();

// Hook personalizado para usar el contexto
export const useApiContext = () => useContext(ApiContext);

// Crear la instancia de axios
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [orden, setOrden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Función para obtener todas las órdenes
  const fetchOrdenes = async (searchTerm = "") => {
    setLoading(true);
    try {
      const response = await api.get(`ordenes/${searchTerm}`);
      const data = response.data;
      setOrden(data);
    } catch (err) {
      setError(true);
      console.error("Error al obtener las órdenes:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva orden
  const createOrden = async (ordenData) => {
    setLoading(true);
    try {
      const response = await api.post("ordenes/", ordenData);
      await fetchOrdenes(); // Actualizar la lista después de crear
      setError(false);
      return response.data;
    } catch (err) {
      setError(true);
      const errorMessage =
        err.response?.data?.error || "Error al crear la orden";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una orden
  const deleteOrden = async (ordenId) => {
    setLoading(true);
    try {
      await api.delete(`ordenes/${ordenId}`);
      setError(false);
      return true;
    } catch (err) {
      setError(true);
      console.error("Error al eliminar la orden:", err);
      const errorMessage =
        err.response?.data?.error || "Error al eliminar la orden";
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
        await fetchOrdenes(); // Actualizar la lista después de eliminar
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Valor del contexto que se proporcionará
  const contextValue = {
    orden,
    loading,
    error,
    setError,
    fetchOrdenes,
    createOrden,
    deleteOrden,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
