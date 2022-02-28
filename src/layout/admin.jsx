import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <React.Fragment>
      <nav className="flex flex-col">
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="jadwal">Jadwal KBM</NavLink>
      </nav>
      <div className="content col-span-9 overflow-auto">
          <Outlet />
        </div>
    </React.Fragment>
  );
}
