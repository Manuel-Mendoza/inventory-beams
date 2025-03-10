import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const API_BASE = "http://192.168.254.60:8000/api/";
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
      // Actualizar la lista de órdenes después de crear una nueva
      await fetchOrdenes();
      setError(false);
      return response.data;
    } catch (err) {
      setError(true);
      console.error("Error al crear la orden:", err);
      throw err;
    } finally {
      setLoading(false);
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
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
