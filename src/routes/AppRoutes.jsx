import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import DbMonitoringDashboard from "../pages/DbMonitoringDashboard.jsx";
import { PMOverviewDashboard } from "../pages/PMOverviewDashboard.jsx";
import Devices from "../pages/Devices.jsx";
import ReportsPage from "../pages/ReportsPage.jsx";
import Adduser from "../pages/AddUser.jsx";

import LinuxDashboard from "../pages/LinuxDashboard.jsx";
import ThirdPartyDashboard from "../pages/ThirdPartyDashboard.jsx";
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

        <Route
          path="/devices/:username/:ipaddress"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <Devices />
            </ProtectedRoute>
          }
        />

        <Route path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/linuxDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <LinuxDashboard />
            </ProtectedRoute>
          }
        />




        <Route
          path="/dashboard/thirdPartyApp"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <ThirdPartyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/master/Createuser"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <Adduser />
            </ProtectedRoute>
          }
        />


      </Route>


    </Routes >
  );
}
