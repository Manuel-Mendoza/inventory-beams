import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente que verifica si el usuario está autenticado
export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
      // Si no está autenticado, redirigir al login
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
}
