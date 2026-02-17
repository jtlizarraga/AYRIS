import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando sesión...</div>;
    }

    // 1. Check authentication
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check role permissions (if profile is loaded and roles are specified)
    if (allowedRoles && profile && !allowedRoles.includes(profile.user_role)) {
        // Redirect to their appropriate dashboard based on their actual role
        // or to a "Not Authorized" page. For now, redirect to home.
        return <Navigate to="/" replace />;
    }

    // If wrapping a Layout (Outlet) or specific component (children)
    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
