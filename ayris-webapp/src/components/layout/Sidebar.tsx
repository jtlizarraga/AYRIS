import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Calendar,
    CreditCard,
    Settings,
    Users,
    FileText,
    LogOut,
    User,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { profile, signOut } = useAuth();
    const role = profile?.user_role || 'client';

    const getLinks = () => {
        switch (role) {
            case 'admin':
                return [
                    { icon: LayoutDashboard, label: 'Resumen', to: '/admin/dashboard' },
                    { icon: Users, label: 'Usuarios', to: '/admin/usuarios' },
                    { icon: FileText, label: 'Reportes', to: '/admin/reportes' },
                    { icon: Settings, label: 'Configuración', to: '/admin/configuracion' },
                ];
            case 'model':
                return [
                    { icon: LayoutDashboard, label: 'Mi Tablero', to: '/modelo/dashboard' },
                    { icon: User, label: 'Mi Perfil', to: '/modelo/perfil' },
                    { icon: Calendar, label: 'Agenda', to: '/modelo/agenda' },
                    { icon: CreditCard, label: 'Pagos', to: '/modelo/pagos' },
                ];
            case 'client':
            default:
                return [
                    { icon: LayoutDashboard, label: 'Mis Proyectos', to: '/cliente/dashboard' },
                    { icon: Users, label: 'Casting', to: '/cliente/casting' },
                    { icon: CreditCard, label: 'Pagos', to: '/cliente/pagos' },
                    { icon: Settings, label: 'Cuenta', to: '/cliente/cuenta' },
                ];
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        display: 'none', // Hidden on desktop via CSS usually, but here we depend on JS state mostly
                    }}
                    className="md:hidden" // Tailwind utility to hide on desktop if mixed, but since we use inline styles primarily in this project context, we will add a className for potential CSS integration or rely on media queries 
                />
            )}

            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    width: '260px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'var(--spacing-6) 0',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ marginBottom: 'var(--spacing-10)', padding: '0 var(--spacing-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-primary)',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            fontWeight: 800,
                            fontSize: '1rem'
                        }}>
                            A
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.5px', margin: 0 }}>AYRIS</h2>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {role === 'admin' ? 'SYSTEM ADMIN' : (role === 'model' ? 'TALENTO PRO' : 'CLIENTE PANEL')}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} className="md:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 var(--spacing-4)' }}>
                    {getLinks().map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={onClose}
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-4)',
                                padding: '1rem var(--spacing-4)',
                                borderRadius: 'var(--radius-md)',
                                color: isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.7)',
                                textDecoration: 'none',
                                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                                transition: 'all 0.2s',
                                fontWeight: 700,
                                fontSize: 'var(--font-size-sm)',
                                marginBottom: '5px'
                            })}
                        >
                            <link.icon size={18} />
                            <span>{link.label.toUpperCase()}</span>
                        </NavLink>
                    ))}
                </nav>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: 'var(--spacing-4) var(--spacing-6)' }}>
                    <button
                        onClick={signOut}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            padding: 'var(--spacing-3)',
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 700
                        }}
                    >
                        <LogOut size={16} />
                        <span>CERRAR SESIÓN</span>
                    </button>
                </div>
            </aside>

            {/* Desktop Sidebar Placeholder (Space reserver) - Only visible on Desktop */}
            <div className="hidden md:block" style={{ width: '250px', flexShrink: 0 }}></div>

            {/* 
                NOTE: The above solution relies on 'md:hidden' and 'md:block' classes being available (Tailwind).
                I also need to inject a <style> to force the sidebar to be visible on desktop regardless of 'isOpen' state.
            */}
            <style>{`
                @media (min-width: 768px) {
                    .sidebar {
                        transform: translateX(0) !important;
                        position: fixed !important; 
                    }
                    .md\\:hidden { display: none !important; }
                    .hidden.md\\:block { display: block !important; }
                }
                @media (max-width: 767px) {
                    .hidden.md\\:block { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default Sidebar;
