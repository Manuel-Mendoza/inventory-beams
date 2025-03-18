import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Inicio from './components/Index';

// Define las rutas básicas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/app',
    element: <Inicio />
  }
]);

export default router;
