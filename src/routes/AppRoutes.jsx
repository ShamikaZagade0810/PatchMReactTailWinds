import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import DbMonitoringDashboard from "../pages/DbMonitoringDashboard.jsx";
import { PMOverviewDashboard } from "../pages/PMOverviewDashboard.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin", "DBA"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="/dashboard/mainDashboard" replace />}
        />
      
        <Route
          path="/dashboard/mainDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
          
              {/* <DbMonitoringDashboard /> */}
              <PMOverviewDashboard />
            </ProtectedRoute>
          }
        />
        
       

      </Route>
    </Routes>
  );
}
