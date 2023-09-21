import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Planos from './pages/Planos';
import Home from './pages/Home';
import Page404 from './pages/Page404';

// Configurando router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedUserRoute from './ProtectedUserRoute';
import Dashboard from './pages/Client/ClientDashboard';
import ClientHome from './pages/Client/ClientHome';
import Funcionarios from './pages/Client/Funcionarios';
import Servicos from './pages/Client/Servicos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '*',
        element: <Page404 />,
      },
      {
        path: '/',
        element: <Home />,
      },

      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'planos',
        element: <Planos />,
      },
      {
        path: 'perfil/*',
        element: (
          <ProtectedUserRoute>
            <Perfil />
          </ProtectedUserRoute>
        ),
      },
    ],
  },
  {
    path: '/client',
    element: <App />,
    children: [
      {
        path: '*',
        element: <Page404 />,
      },
      {
        path: 'home',
        element: <ClientHome />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'cadastrar/funcionario',
        element: <Funcionarios />,
      },
      {
        path: 'cadastrar/servico',
        element: <Servicos />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
