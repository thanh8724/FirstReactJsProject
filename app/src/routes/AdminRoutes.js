import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPageComponet from "../components/AdminPageComponet";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import Bills from "../pages/admin/Bills";
const AdminRoutes = () => {
  return (
    <>
      <AdminPageComponet
        element={
          <Routes>
            <Route path="/dashboard" element={<Dashboard></Dashboard>} />
            <Route path="/categories" element={<Categories></Categories>} />
            <Route path="/products" element={<Products></Products>} />
            <Route path="/bills" element={<Bills></Bills>} />
            <Route path="*" element={<Dashboard></Dashboard>} />
          </Routes>
        }
      />
    </>
  );
};
export default AdminRoutes;
