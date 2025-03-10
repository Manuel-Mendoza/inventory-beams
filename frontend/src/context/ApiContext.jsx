import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://192.168.254.60:8000/api/";
const ApiContext = createContext();

export const useApiContext = () => useContext(ApiContext);

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiProvider = ({ children }) => {
  const [orden, setOrden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Función para obtener todas las órdenes
  const fetchOrdenes = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await api.get(`ordenes/${searchTerm}`);
      const data = response.data;
      const ordenesArray = Array.isArray(data) ? data : [data];
      setOrden(ordenesArray);
      setError(false);
      return ordenesArray;
    } catch (err) {
      setError(true);
      console.error('Error al obtener las órdenes:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva orden
  const createOrden = async (ordenData) => {
    setLoading(true);
    try {
      const response = await api.post('ordenes/', ordenData);
      // Actualizar la lista de órdenes después de crear una nueva
      await fetchOrdenes();
      setError(false);
      return response.data;
    } catch (err) {
      setError(true);
      console.error('Error al crear la orden:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const contextValue = {
    orden,
    loading,
    error,
    fetchOrdenes,
    createOrden
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
