import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import ModelCatalog from './pages/ModelCatalog';
import ModelProfile from './pages/ModelProfile';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import ModelDashboard from './pages/dashboards/ModelDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import HowItWorks from './pages/HowItWorks';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="modelos" element={<ModelCatalog />} />
          <Route path="como-funciona" element={<HowItWorks />} />
          <Route path="modelos/:id" element={<ModelProfile />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<LoginPage />} />

          {/* Placeholder for future routes */}
          <Route path="contacto" element={<div className="container p-4"><h1>Contacto (Próximamente)</h1></div>} />
        </Route>

        {/* Rutas Protegidas / Dashboards */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="cliente/dashboard" element={
            <ProtectedRoute allowedRoles={['client', 'admin']}>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="modelo/dashboard" element={
            <ProtectedRoute allowedRoles={['model', 'admin']}>
              <ModelDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
