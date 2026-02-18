import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Users } from 'lucide-react';
import { useModels } from '../hooks/useModels';
import ModelCard from '../components/features/ModelCard';

const LandingPage: React.FC = () => {
    const { models, loading } = useModels();

    // Filtrar modelos destacados
    const featuredModels = models.filter(m => m.featured).slice(0, 4);

    return (
        <div className="landing-page">
            {/* HERO SECTION */}
            <section className="hero-section" style={{
                position: 'relative',
                padding: '120px 0 80px',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e293b 100%)',
                color: 'var(--color-white)',
                overflow: 'hidden'
            }}>
                {/* Decoración de fondo */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '40%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h1 className="animate-fade-in" style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            La Excelencia en <span style={{ color: 'var(--color-accent)' }}>Talento Premium</span> para tus Eventos
                        </h1>
                        <p className="animate-fade-in stagger-1" style={{
                            fontSize: '1.25rem',
                            color: 'var(--gray-300)',
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Conectamos marcas prestigiosas con los perfiles más profesionales: modelos, edecanes y talento corporativo de alto nivel.
                        </p>

                        <div className="animate-fade-in stagger-2" style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Link to="/modelos" className="btn btn-primary btn-lg">
                                Explorar Catálogo
                            </Link>
                            <Link to="/registro" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                                Registrarse como Talento
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS / FEATURES BAR */}
            <section style={{ padding: '2rem 0', background: 'var(--color-white)', borderBottom: '1px solid var(--gray-200)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center'
                    }}>
                        <div className="flex flex-col items-center">
                            <Shield style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Seguro y Confiable</h4>
                            <p className="text-sm text-muted">Perfiles verificados 100%</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Zap style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Respuesta Inmediata</h4>
                            <p className="text-sm text-muted">Gestión de bookings en tiempo real</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Users style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Atención Personalizada</h4>
                            <p className="text-sm text-muted">Soporte premium 24/7</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>Nuestras Especialidades</h2>
                        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { title: 'Modelos de Pasarela', desc: 'Profesionales para desfiles de alta costura.', img: 'https://images.unsplash.com/photo-1539109132304-35104b25ad91?auto=format&fit=crop&q=80&w=400' },
                            { title: 'Modelos de Imagen', desc: 'Perfiles para activaciones de marca y publicidad.', img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=400' },
                            { title: 'Talento Corporativo', desc: 'Hostess y coordinadores para eventos empresariales.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' }
                        ].map((cat, i) => (
                            <div key={i} className="card animate-scale-in" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{cat.title}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{cat.desc}</p>
                                    <Link to={`/modelos?cat=${cat.title}`} style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>
                                        Ver perfiles →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED MODELS */}
            <section style={{ padding: '80px 0', backgroundColor: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Modelos Destacados</h2>
                            <p className="text-muted">La elite de nuestro catálogo actual</p>
                        </div>
                        <Link to="/modelos" className="nav-link" style={{ fontSize: '1rem' }}>Ver todos los modelos →</Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">Cargando modelos...</div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}>
                            {featuredModels.length > 0 ? (
                                featuredModels.map(model => (
                                    <ModelCard key={model.id} model={model} />
                                ))
                            ) : (
                                // Fallback info perfiles de prueba si no hay en DB
                                <div className="col-span-full py-10 text-center text-muted">
                                    No hay modelos destacados actualmente.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA SECTION */}
            <section style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-morphism" style={{
                        padding: '4rem 2rem',
                        borderRadius: '24px',
                        background: 'var(--color-primary)',
                        color: 'white'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Listo para elevar tu marca?</h2>
                        <p style={{ marginBottom: '2.5rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Comienza hoy mismo a gestionar tus reservaciones con el mejor talento de la industria.
                        </p>
                        <Link to="/login" className="btn btn-primary btn-lg">
                            Empieza Ahora
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
