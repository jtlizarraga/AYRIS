import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Menu } from 'lucide-react';

const DashboardLayout: React.FC = () => {
    const { profile } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <header style={{
                    backgroundColor: 'var(--color-white)',
                    padding: '0 var(--spacing-6)',
                    height: '70px',
                    borderBottom: '1px solid var(--gray-200)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            className="md:hidden"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '1rem',
                                color: 'var(--color-primary)'
                            }}
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>PANEL DE CONTROL</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                        <div style={{ textAlign: 'right' }} className="md:block">
                            <p style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', margin: 0, color: 'var(--color-primary)' }}>
                                {profile?.full_name?.toUpperCase() || 'USUARIO'}
                            </p>
                            <p style={{ color: 'var(--color-accent)', fontSize: '10px', fontWeight: 800, margin: 0 }}>
                                {profile?.user_role?.toUpperCase()}
                            </p>
                        </div>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-white)',
                            fontWeight: 800,
                            fontSize: 'var(--font-size-sm)'
                        }}>
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>
                <div style={{ padding: 'var(--spacing-6)', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </main>
            <style>{`
                @media (max-width: 767px) {
                    .md\\:block { display: none !important; }
                    .md\\:hidden { display: block !important; }
                }
                @media (min-width: 768px) {
                    .md\\:block { display: block !important; }
                    .md\\:hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
