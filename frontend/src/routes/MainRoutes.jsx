import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import AuthContextProvider, { useAuth } from '../contexts/AuthContextProvider';

import EmailList from "../pages/Archive.jsx";
import EmailDetail from "../pages/Inbox.jsx";
import ComposeEmail from "../pages/ComposeEmail.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/c/inbox" replace />,
  },
  {
    path: "/c/:emailCategory",
    element: (
      <ProtectedRoute>
        <EmailList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/c/:emailCategory/:emailId",
    element: (
      <ProtectedRoute>
        <EmailDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compose",
    element: (
      <ProtectedRoute>
        <ComposeEmail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const MainRoutes = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default MainRoutes;
