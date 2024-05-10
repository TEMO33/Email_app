import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from '../contexts/AuthContextProvider'; 

import EmailList from "../pages/EmailList";
import EmailDetail from "../pages/EmailDetail";
import ComposeEmail from "../pages/ComposeEmail.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import {
  useAuth,
} from "../contexts/AuthContextProvider.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const MainRoutes = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/c/inbox" />} />
          <Route
            path="/c/:emailCategory"
            element={
              <ProtectedRoute>
                <EmailList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c/:emailCategory/:emailId"
            element={
              <ProtectedRoute>
                <EmailDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compose"
            element={
              <ProtectedRoute>
                <ComposeEmail />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default MainRoutes;
