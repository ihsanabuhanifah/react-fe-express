import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";
import io from "socket.io-client";

import Layout from "./layout/admin";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectRoute from "./routers/ProtectRoute";
import Chat from "./pages/Admin/Chat";

export const socket = io.connect('http://localhost:8090')

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
