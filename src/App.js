import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";

import Layout from "./layout/admin";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectRoute from "./routers/ProtectRoute";

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
        \<Route path="jadwal" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
