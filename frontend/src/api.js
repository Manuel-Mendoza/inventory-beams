/**
 * @file Configuración centralizada de Axios para llamadas API
 * @module api
 */

import axios from 'axios';

/**
 * Instancia base de Axios con configuración común
 * @type {AxiosInstance}
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo centralizado de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la solicitud API:', error);
    return Promise.reject(error);
  }
);

/**
 * Función helper para requests autenticados
 * @param {string} token - JWT de autenticación
 * @returns {AxiosInstance} Instancia de Axios con headers de autenticación
 */
export const authHeader = (token) => {
  return axios.create({
    ...api.defaults,
    headers: {
      ...api.defaults.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};