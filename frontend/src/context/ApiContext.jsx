import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cargando from "../components/Vistas/Loading";
// Crear el contexto
const API_BASE = "https://vigasapp-production.up.railway.app/api/";
const API_LOCAL = "http://localhost:8000/api/"; // Corregido el protocolo de http a https
const ApiContext = createContext();

// Hook personalizado para usar el contexto
export const useApiContext = () => useContext(ApiContext);

// Crear la instancia de axios
const api = axios.create({
  baseURL: API_BASE, // Cambiado a API_BASE para producción
  headers: {
    "Content-Type": "application/json",
  },
});

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [orden, setOrden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editarBeam, setEditarBeam] = useState(false);

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
      console.error("Error completo:", err);
      const errorMessage =
        err.response?.data?.error ||
        JSON.stringify(err.response?.data) ||
        "Error al crear la orden";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una viga específica de una orden
  const deleteViga = async (ordenData, vigaToDelete) => {
    setLoading(true);
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (
        !ordenData ||
        !ordenData.numero_orden ||
        !ordenData.fecha ||
        !vigaToDelete
      ) {

        throw new Error("Datos incompletos para eliminar la viga");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;



      try {
        // Primero obtenemos todas las órdenes para encontrar el ID
        const response = await api.get("ordenes/");

        if (!response || !response.data) {
          throw new Error("No se pudo obtener la lista de órdenes");
        }

        const ordenes = response.data;

        // Buscamos la orden específica que contiene la viga
        const ordenToUpdate = ordenes.find(
          (orden) =>
            orden.numero_orden === numero_orden && orden.fecha === fecha
        );

        if (!ordenToUpdate) {
          throw new Error(
            `No se encontró la orden con número ${numero_orden} y fecha ${fecha}`
          );
        }

        // Obtenemos el ID de la orden
        const ordenId = ordenToUpdate.id;

        if (!ordenId) {
          throw new Error("No se pudo obtener el ID de la orden");
        }

        // Filtramos las vigas para eliminar la seleccionada
        const updatedVigas = ordenToUpdate.vigas.filter(
          (viga) =>
            viga.nombre !== vigaToDelete.nombre ||
            viga.medidas !== vigaToDelete.medidas
        );

        // Si no quedan vigas, eliminamos toda la orden
        if (updatedVigas.length === 0) {
          
          const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
          
        } else {
          // Si quedan vigas, actualizamos la orden con las vigas restantes
          const updatedOrden = {
            ...ordenToUpdate,
            vigas: updatedVigas,
          };

          
          const updateResponse = await api.put(
            `ordenes/${ordenId}/`,
            updatedOrden
          );
          
        }

        setError(false);
        // Actualizar la lista después de modificar
        await fetchOrdenes();
        return true;
      } catch (apiError) {
        console.error("Error en la comunicación con la API:", apiError);
        throw apiError;
      }
    } catch (err) {
      setError(true);
      console.error("Error al eliminar la viga:", err);

      if (err.response) {
        console.error("Detalles de la respuesta:", err.response);
        const errorMessage =
          err.response.data?.error || "Error al eliminar la viga";
        throw new Error(errorMessage);
      } else {
        throw new Error(err.message || "Error al eliminar la viga");
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una orden completa
  const deleteOrden = async (ordenData) => {
    setLoading(true);
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (!ordenData || !ordenData.numero_orden || !ordenData.fecha) {
        console.error("Datos de orden recibidos:", ordenData);
        throw new Error("Datos de orden incompletos");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;


      try {
        // Primero obtenemos todas las órdenes para encontrar el ID
        const response = await api.get("ordenes/");
        :", response);

        if (!response || !response.data) {
          throw new Error("No se pudo obtener la lista de órdenes");
        }

        const ordenes = response.data;

        // Buscamos la orden específica que queremos eliminar
        // Comparamos tanto el número de orden como la fecha para asegurar que eliminamos la correcta
        const ordenToDelete = ordenes.find(
          (orden) =>
            orden.numero_orden === numero_orden && orden.fecha === fecha
        );

        if (!ordenToDelete) {
          throw new Error(
            `No se encontró la orden con número ${numero_orden} y fecha ${fecha}`
          );
        }

        // Obtenemos el ID de la orden
        const ordenId = ordenToDelete.id;

        if (!ordenId) {
          throw new Error("No se pudo obtener el ID de la orden");
        }

        
        

        // Ahora hacemos la solicitud DELETE con el ID correcto
        const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
        

        
        setError(false);
        // Actualizar la lista después de eliminar
        await fetchOrdenes();
        return true;
      } catch (apiError) {
        console.error("Error en la comunicación con la API:", apiError);
        throw apiError;
      }
    } catch (err) {
      setError(true);
      console.error("Error al eliminar la orden:", err);

      // Verificamos si err.response existe antes de intentar acceder a sus propiedades
      if (err.response) {
        console.error("Detalles de la respuesta:", err.response);
        const errorMessage =
          err.response.data?.error || "Error al eliminar la orden";
        throw new Error(errorMessage);
      } else {
        // Si no hay respuesta, usamos el mensaje de error original
        throw new Error(err.message || "Error al eliminar la orden");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Función para actualizar la cantidad de vigas (restar las terminadas)
  const updateVigaQuantity = async (ordenData, vigaToUpdate, cantidadTerminada) => {
    setLoading(true);
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (!ordenData || !ordenData.numero_orden || !ordenData.fecha || !vigaToUpdate) {
        console.error("Datos recibidos:", { ordenData, vigaToUpdate });
        throw new Error("Datos incompletos para actualizar la viga");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;

      
      
      

      // Primero obtenemos todas las órdenes para encontrar el ID
      const response = await api.get("ordenes/");

      if (!response || !response.data) {
        throw new Error("No se pudo obtener la lista de órdenes");
      }

      const ordenes = response.data;

      // Buscamos la orden específica que contiene la viga
      const ordenToUpdate = ordenes.find(
        (orden) => orden.numero_orden === numero_orden && orden.fecha === fecha
      );

      if (!ordenToUpdate) {
        throw new Error(`No se encontró la orden con número ${numero_orden} y fecha ${fecha}`);
      }

      // Obtenemos el ID de la orden
      const ordenId = ordenToUpdate.id;

      if (!ordenId) {
        throw new Error("No se pudo obtener el ID de la orden");
      }

      

      // Actualizamos la cantidad de la viga específica
      const updatedVigas = ordenToUpdate.vigas.map(viga => {
        if (viga.nombre === vigaToUpdate.nombre && viga.medidas === vigaToUpdate.medidas) {
          // Calculamos la nueva cantidad (restando las terminadas)
          const nuevaCantidad = Math.max(0, viga.cantidad - cantidadTerminada);
          return { ...viga, cantidad: nuevaCantidad };
        }
        return viga;
      });

      // Filtramos las vigas con cantidad 0 (opcional, según requerimiento)
      const filteredVigas = updatedVigas.filter(viga => viga.cantidad > 0);

      // Si no quedan vigas, eliminamos toda la orden
      if (filteredVigas.length === 0) {
        
        const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
        
      } else {
        // Si quedan vigas, actualizamos la orden con las vigas actualizadas
        const updatedOrden = {
          ...ordenToUpdate,
          vigas: filteredVigas,
        };

        
        const updateResponse = await api.put(`ordenes/${ordenId}/`, updatedOrden);
        
      }

      setError(false);
      // Actualizar la lista después de modificar
      await fetchOrdenes();
      return true;
    } catch (err) {
      setError(true);
      console.error("Error al actualizar la viga:", err);

      if (err.response) {
        console.error("Detalles de la respuesta:", err.response);
        const errorMessage = err.response.data?.error || "Error al actualizar la viga";
        throw new Error(errorMessage);
      } else {
        throw new Error(err.message || "Error al actualizar la viga");
      }
    } finally {
      setLoading(false);
    }
  };

  // Valor del contexto que se proporcionará
  const contextValue = {
    orden,
    loading,
    error,
    setError,
    fetchOrdenes,
    createOrden,
    deleteOrden,
    deleteViga,
    editarBeam,
    setEditarBeam,
    updateVigaQuantity,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
