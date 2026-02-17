import React from 'react';
import Card from '../../components/ui/Card';
import { useAdminStats } from '../../hooks/useAdminStats';

const AdminDashboard: React.FC = () => {
    const { stats, loading } = useAdminStats();

    if (loading) {
        return <div className="p-8 text-center">Cargando estadísticas...</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-8)' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                    SISTEMA DE CONTROL
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 700 }}>PANEL ADMINISTRATIVO GLOBAL</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
                <Card style={{ borderLeft: '4px solid var(--gray-400)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>Usuarios Totales</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>{stats.totalUsers}</p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-primary)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>Modelos Activos</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>{stats.activeModels}</p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-accent)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>Reservas Totales</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-accent)', margin: 0 }}>{stats.totalBookings}</p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-emerald)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>Ingresos Totales</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        <span style={{ color: 'var(--color-emerald)' }}>$</span>{stats.totalRevenue.toLocaleString()}
                    </p>
                </Card>
            </div>

            <Card>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>Gestión Reciente</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>Resumen de actividad del sistema.</p>
                <div style={{ height: '200px', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
                    Gráficos de actividad (Próximamente)
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
