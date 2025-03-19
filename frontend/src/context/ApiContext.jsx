import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Add this import
import Loader from "../components/Vistas/Loader";
import { useAuth } from "./AuthContext";

// Crear el contexto
const API_BASE = "https://vigasapp-production.up.railway.app/api/";
const API_LOCAL = "http://localhost:8000/api/";
const ApiContext = createContext();

// Hook personalizado para usar el contexto
export const useApiContext = () => useContext(ApiContext);

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [orden, setOrden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editarBeam, setEditarBeam] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { isAuthenticated } = useAuth();

  // Crear la instancia de axios con el token de autenticación
  const getApi = () => {
    const token = localStorage.getItem("token");
    const csrfToken = Cookies.get("csrftoken");

    return axios.create({
      baseURL: API_BASE,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true, // Asegúrate de que las cookies se envíen con las solicitudes
    });
  };

  // Función para mostrar el loader con un mensaje específico
  const showLoader = (message) => {
    setLoadingMessage(message);
    setLoading(true);
  };

  // Función para ocultar el loader
  const hideLoader = () => {
    setLoading(false);
    setLoadingMessage("");
  };

  // Función para obtener todas las órdenes
  const fetchOrdenes = async (searchTerm = "") => {
    showLoader(searchTerm ? "Buscando órdenes..." : "Cargando órdenes...");
    try {
      const api = getApi();
      const response = await api.get(`ordenes/${searchTerm}`);
      const data = response.data;
      setOrden(data);
      return data;
    } catch (err) {
      setError(true);
      console.error("Error al obtener las órdenes:", err);
      return [];
    } finally {
      hideLoader();
    }
  };

  // Función para crear una nueva orden
  const createOrden = async (ordenData) => {
    showLoader("Creando nueva orden...");
    try {
      console.log(
        "Enviando datos a la API:",
        JSON.stringify(ordenData, null, 2)
      );
      const api = getApi();
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
      hideLoader();
    }
  };

  // Función para eliminar una viga específica de una orden
  const deleteViga = async (ordenData, vigaToDelete) => {
    showLoader("Eliminando viga...");
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (
        !ordenData ||
        !ordenData.numero_orden ||
        !ordenData.fecha ||
        !vigaToDelete
      ) {
        console.error("Datos recibidos:", { ordenData, vigaToDelete });
        throw new Error("Datos incompletos para eliminar la viga");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;

      console.log(
        `Buscando orden con número: ${numero_orden} y fecha: ${fecha}`
      );
      console.log(`Viga a eliminar:`, vigaToDelete);

      try {
        const api = getApi();
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

        console.log(`Orden encontrada, ID: ${ordenId}`);

        // Filtramos las vigas para eliminar la seleccionada
        const updatedVigas = ordenToUpdate.vigas.filter(
          (viga) =>
            viga.nombre !== vigaToDelete.nombre ||
            viga.medidas !== vigaToDelete.medidas
        );

        // Si no quedan vigas, eliminamos toda la orden
        if (updatedVigas.length === 0) {
          console.log("No quedan vigas, eliminando toda la orden");
          const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
          console.log("Orden eliminada completamente:", deleteResponse);
        } else {
          // Si quedan vigas, actualizamos la orden con las vigas restantes
          const updatedOrden = {
            ...ordenToUpdate,
            vigas: updatedVigas,
          };

          console.log("Actualizando orden con vigas restantes:", updatedOrden);
          const updateResponse = await api.put(
            `ordenes/${ordenId}/`,
            updatedOrden
          );
          console.log("Orden actualizada:", updateResponse);
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
      hideLoader();
    }
  };

  // Función para eliminar una orden completa
  const deleteOrden = async (ordenData) => {
    showLoader("Eliminando orden...");
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (!ordenData || !ordenData.numero_orden || !ordenData.fecha) {
        console.error("Datos de orden recibidos:", ordenData);
        throw new Error("Datos de orden incompletos");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;

      console.log(
        `Buscando orden con número: ${numero_orden} y fecha: ${fecha}`
      );

      try {
        const api = getApi();
        // Primero obtenemos todas las órdenes para encontrar el ID
        const response = await api.get("ordenes/");
        console.log("Respuesta de la API (ordenes):", response);

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

        console.log(`Orden encontrada, ID: ${ordenId}`);
        console.log(`Enviando solicitud DELETE para orden con ID: ${ordenId}`);

        // Ahora hacemos la solicitud DELETE con el ID correcto
        const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
        console.log("Respuesta de eliminación:", deleteResponse);

        console.log("Respuesta exitosa de la API");
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
      hideLoader();
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Función para actualizar la cantidad de vigas (restar las terminadas)
  const updateVigaQuantity = async (
    ordenData,
    vigaToUpdate,
    cantidadTerminada
  ) => {
    showLoader("Actualizando cantidad de vigas...");
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (
        !ordenData ||
        !ordenData.numero_orden ||
        !ordenData.fecha ||
        !vigaToUpdate
      ) {
        console.error("Datos recibidos:", { ordenData, vigaToUpdate });
        throw new Error("Datos incompletos para actualizar la viga");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;

      console.log(
        `Buscando orden con número: ${numero_orden} y fecha: ${fecha}`
      );
      console.log(`Viga a actualizar:`, vigaToUpdate);
      console.log(`Cantidad terminada:`, cantidadTerminada);

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
        throw new Error(
          `No se encontró la orden con número ${numero_orden} y fecha ${fecha}`
        );
      }

      // Obtenemos el ID de la orden
      const ordenId = ordenToUpdate.id;

      if (!ordenId) {
        throw new Error("No se pudo obtener el ID de la orden");
      }

      console.log(`Orden encontrada, ID: ${ordenId}`);

      // Actualizamos la cantidad de la viga específica
      const updatedVigas = ordenToUpdate.vigas.map((viga) => {
        if (
          viga.nombre === vigaToUpdate.nombre &&
          viga.medidas === vigaToUpdate.medidas
        ) {
          // Calculamos la nueva cantidad (restando las terminadas)
          const nuevaCantidad = Math.max(0, viga.cantidad - cantidadTerminada);
          return { ...viga, cantidad: nuevaCantidad };
        }
        return viga;
      });

      // Filtramos las vigas con cantidad 0 (opcional, según requerimiento)
      const filteredVigas = updatedVigas.filter((viga) => viga.cantidad > 0);

      // Si no quedan vigas, eliminamos toda la orden
      if (filteredVigas.length === 0) {
        console.log("No quedan vigas, eliminando toda la orden");
        const deleteResponse = await api.delete(`ordenes/${ordenId}/`);
        console.log("Orden eliminada completamente:", deleteResponse);
      } else {
        // Si quedan vigas, actualizamos la orden con las vigas actualizadas
        const updatedOrden = {
          ...ordenToUpdate,
          vigas: filteredVigas,
        };

        console.log("Actualizando orden con vigas restantes:", updatedOrden);
        const updateResponse = await api.put(
          `ordenes/${ordenId}/`,
          updatedOrden
        );
        console.log("Orden actualizada:", updateResponse);
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
        const errorMessage =
          err.response.data?.error || "Error al actualizar la viga";
        throw new Error(errorMessage);
      } else {
        throw new Error(err.message || "Error al actualizar la viga");
      }
    } finally {
      hideLoader();
    }
  };

  // Función para actualizar una orden completa
  const updateOrden = async (ordenId, updatedOrdenData) => {
    showLoader("Actualizando orden...");
    try {
      console.log(`Actualizando orden con ID: ${ordenId}`, updatedOrdenData);

      // Verificamos que los datos sean válidos
      if (!ordenId || !updatedOrdenData) {
        throw new Error("Datos incompletos para actualizar la orden");
      }

      const api = getApi();
      // Realizamos la solicitud PUT para actualizar la orden
      const response = await api.put(`ordenes/${ordenId}/`, updatedOrdenData);
      console.log("Orden actualizada:", response.data);

      // Actualizamos la lista después de modificar
      await fetchOrdenes();
      setError(false);
      return response.data;
    } catch (err) {
      setError(true);
      console.error("Error al actualizar la orden:", err);

      if (err.response) {
        console.error("Detalles de la respuesta:", err.response);
        const errorMessage =
          err.response.data?.error || "Error al actualizar la orden";
        throw new Error(errorMessage);
      } else {
        throw new Error(err.message || "Error al actualizar la orden");
      }
    } finally {
      hideLoader();
    }
  };

  // Función para actualizar una viga específica dentro de una orden
  const updateViga = async (ordenData, oldViga, updatedViga) => {
    showLoader("Actualizando viga...");
    try {
      // Verificamos que ordenData tenga los campos necesarios
      if (
        !ordenData ||
        !ordenData.numero_orden ||
        !ordenData.fecha ||
        !oldViga ||
        !updatedViga
      ) {
        console.error("Datos recibidos:", { ordenData, oldViga, updatedViga });
        throw new Error("Datos incompletos para actualizar la viga");
      }

      // Extraemos el número de orden y la fecha
      const { numero_orden, fecha } = ordenData;

      console.log(
        `Buscando orden con número: ${numero_orden} y fecha: ${fecha}`
      );
      console.log(`Viga a actualizar:`, oldViga);
      console.log(`Nuevos datos de viga:`, updatedViga);

      const api = getApi();
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
        throw new Error(
          `No se encontró la orden con número ${numero_orden} y fecha ${fecha}`
        );
      }

      // Obtenemos el ID de la orden
      const ordenId = ordenToUpdate.id;

      if (!ordenId) {
        throw new Error("No se pudo obtener el ID de la orden");
      }

      console.log(`Orden encontrada, ID: ${ordenId}`);

      // Actualizamos la viga específica
      const updatedVigas = ordenToUpdate.vigas.map((viga) => {
        if (
          viga.nombre === oldViga.nombre &&
          viga.medidas === oldViga.medidas
        ) {
          return updatedViga;
        }
        return viga;
      });

      // Actualizamos la orden con las vigas actualizadas
      const updatedOrden = {
        ...ordenToUpdate,
        vigas: updatedVigas,
      };

      console.log("Actualizando orden con vigas modificadas:", updatedOrden);
      const updateResponse = await api.put(`ordenes/${ordenId}/`, updatedOrden);
      console.log("Orden actualizada:", updateResponse);

      setError(false);
      // Actualizar la lista después de modificar
      await fetchOrdenes();
      return true;
    } catch (err) {
      setError(true);
      console.error("Error al actualizar la viga:", err);

      if (err.response) {
        console.error("Detalles de la respuesta:", err.response);
        const errorMessage =
          err.response.data?.error || "Error al actualizar la viga";
        throw new Error(errorMessage);
      } else {
        throw new Error(err.message || "Error al actualizar la viga");
      }
    } finally {
      hideLoader();
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrdenes();
    }
  }, [isAuthenticated]);

  // Valor del contexto que se proporcionará
  const contextValue = {
    orden,
    loading,
    loadingMessage,
    error,
    setError,
    fetchOrdenes,
    createOrden,
    deleteOrden,
    deleteViga,
    editarBeam,
    setEditarBeam,
    updateVigaQuantity,
    updateOrden,
    updateViga,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {loading && <Loader message={loadingMessage} />}
      {children}
    </ApiContext.Provider>
  );
};
