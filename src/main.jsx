import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Tickets from "./Pages/Tickets";
import Users from "./Pages/Users";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import { UserContextProvider } from "./context/UserContext";
import "./index.css"
import ProtectedRoute from "./components/Protected";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <UserContextProvider>
  <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/users" element={<Users />} />
         */}
         <Route
          path="/"
          element={
            <ProtectedRoute requiredRole="admin">
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute requiredRole="admin">
              <Tickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
