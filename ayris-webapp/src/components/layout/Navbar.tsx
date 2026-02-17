import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!profile) return '/';
        switch (profile.user_role) {
            case 'client': return '/cliente/dashboard';
            case 'model': return '/modelo/dashboard';
            case 'admin': return '/admin/dashboard';
            default: return '/';
        }
    };

    return (
        <nav style={{
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--gray-200)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: 'var(--spacing-1) 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-2) var(--spacing-2)',
            }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-white)',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '1.2rem'
                    }}>
                        A
                    </div>
                    <h1 style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 800,
                        color: 'var(--color-primary)',
                        margin: 0,
                        letterSpacing: '-0.5px'
                    }}>
                        AYRIS MODELS
                    </h1>
                </Link>

                <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginRight: 'var(--spacing-2)' }}>
                        <Link to="/" className="nav-link">Inicio</Link>
                        <Link to="/modelos" className="nav-link">Modelos</Link>
                        <Link to="/como-funciona" className="nav-link">Cómo Funciona</Link>
                    </div>

                    {user ? (
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                            <Link to={getDashboardLink()} className="nav-link">Dashboard</Link>
                            <span style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                                {profile?.full_name}
                            </span>
                            <Button variant="outline" size="sm" onClick={handleSignOut}>
                                Salir
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}>
                            <Link to="/login" className="nav-link">Login / Registro</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
