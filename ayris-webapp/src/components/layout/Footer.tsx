import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: 'white',
            padding: 'var(--spacing-16) 0 var(--spacing-8)',
            borderTop: '1px solid var(--gray-100)'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: 'var(--spacing-12)', marginBottom: 'var(--spacing-16)' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--spacing-6)' }}>
                            <div style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-white)',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '0.8rem'
                            }}>
                                A
                            </div>
                            <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>AYRIS</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6, maxWidth: '240px' }}>
                            La plataforma definitiva para la gestión de talento premium profesional y bookings corporativos.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)', fontSize: '14px', textTransform: 'uppercase' }}>Plataforma</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            <li><Link to="/modelos" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Modelos</Link></li>
                            <li><Link to="/modelos" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Edecanes</Link></li>
                            <li><Link to="/como-funciona" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Precios</Link></li>
                            <li><Link to="/como-funciona" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Ciudades</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)', fontSize: '14px', textTransform: 'uppercase' }}>Compañía</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Sobre nosotros</Link></li>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Blog</Link></li>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Prensa</Link></li>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)', fontSize: '14px', textTransform: 'uppercase' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Términos</Link></li>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Privacidad</Link></li>
                            <li><Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px' }}>Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--gray-100)',
                    paddingTop: 'var(--spacing-8)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <p style={{ color: 'var(--gray-400)', fontSize: '12px' }}>
                        © 2024 AYRIS Models. Todos los derechos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
                        <Link to="/" style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: '12px' }}>Instagram</Link>
                        <Link to="/" style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: '12px' }}>LinkedIn</Link>
                        <Link to="/" style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: '12px' }}>Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
