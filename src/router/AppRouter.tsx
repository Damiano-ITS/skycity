import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PERMISSIONS, type Permission } from "../config/permissions";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ManutenzioniPage from "../pages/Manutenzioni/ManutenzioniPage";
import VeicoliPage from "../pages/Veicoli/VeicoliPage";
import StazioniPage from "../pages/Stazioni/StazioniPage";
import ReportPage from "../pages/Report/ReportPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage";
import type { JSX } from "react";

interface ProtectedRouteProps {
  perform: Permission;
  children: JSX.Element;
}

function ProtectedRoute({ perform, children }: ProtectedRouteProps) {
  const { hasPermission } = useAuth();
  return hasPermission(perform) ? children : <Navigate to="/unauthorized" replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        <Route 
          path="manutenzioni" 
          element={
            <ProtectedRoute perform={PERMISSIONS.MANUTENZIONI_VIEW}>
              <ManutenzioniPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="veicoli" 
          element={
            <ProtectedRoute perform={PERMISSIONS.VEICOLI_VIEW}>
              <VeicoliPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="stazioni" 
          element={
            <ProtectedRoute perform={PERMISSIONS.STAZIONI_VIEW}>
              <StazioniPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="report" 
          element={
            <ProtectedRoute perform={PERMISSIONS.REPORT_VIEW}>
              <ReportPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="analytics" 
          element={
            <ProtectedRoute perform={PERMISSIONS.ANALYTICS_VIEW}>
              <AnalyticsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}