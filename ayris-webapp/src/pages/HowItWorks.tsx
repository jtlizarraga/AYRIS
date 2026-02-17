import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { ChevronDown, CheckCircle2, Shield, LayoutDashboard, Star } from 'lucide-react';

const HowItWorks: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            {/* HERO SECTION */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                backgroundColor: 'white'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--spacing-12)', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 'var(--spacing-4)' }}>
                            PREMIUM TALENT MARKETPLACE
                        </p>
                        <h1 style={{
                            fontSize: '4.8rem',
                            fontWeight: 900,
                            color: 'var(--color-primary)',
                            lineHeight: 0.9,
                            marginBottom: 'var(--spacing-6)',
                            letterSpacing: '-2px'
                        }}>
                            Cómo contratar modelos y edecanes de forma <span style={{ color: 'var(--color-accent)' }}>profesional</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-10)', maxWidth: '520px', lineHeight: 1.6, fontWeight: 500 }}>
                            Descubre la plataforma líder en gestión de talento premium. Simplificamos tu búsqueda con un proceso digital, seguro y elegante para tus eventos de alto perfil.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                            <Link to="/modelos">
                                <Button variant="accent" size="lg" style={{ padding: '0 2.5rem', fontWeight: 800, borderRadius: '8px' }}>Explorar modelos</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg" style={{ padding: '0 2.5rem', fontWeight: 800, borderRadius: '8px', border: '2px solid var(--gray-200)' }}>Crear cuenta</Button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1488161628813-244768e7fbc8?auto=format&fit=crop&q=80&w=800"
                                alt="Professional Model"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* QUÉ ES AYRIS SECTION */}
            <section style={{ padding: 'var(--spacing-20) 0', textAlign: 'center', backgroundColor: 'var(--gray-50)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-12)' }}>
                        ¿Qué es AYRIS?
                        <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-accent)', margin: '15px auto 0' }}></div>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-8)' }}>
                        <FeatureCard
                            icon={<div style={{ backgroundColor: 'var(--color-accent)', padding: '10px', borderRadius: '8px', display: 'inline-flex' }}><Shield size={24} color="white" /></div>}
                            title="Seguridad"
                            text="Verificación rigurosa de identidad y antecedentes de cada perfil en nuestra plataforma para tu tranquilidad."
                        />
                        <FeatureCard
                            icon={<div style={{ backgroundColor: 'var(--color-accent)', padding: '10px', borderRadius: '8px', display: 'inline-flex' }}><Star size={24} color="white" /></div>}
                            title="Profesionalismo"
                            text="Talento especializado y con experiencia comprobada para los eventos más exigentes de la industria global."
                        />
                        <FeatureCard
                            icon={<div style={{ backgroundColor: 'var(--color-accent)', padding: '10px', borderRadius: '8px', display: 'inline-flex' }}><LayoutDashboard size={24} color="white" /></div>}
                            title="Gestión Digital"
                            text="Control total de tus contratos, calendarios y pagos centralizado en un dashboard intuitivo y elegante."
                        />
                    </div>
                </div>
            </section>

            {/* TU CAMINO SECTION */}
            <section style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-16)' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-3)' }}>
                            Tu camino en la plataforma
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px' }}>
                            Un proceso optimizado en 8 simples pasos para garantizar el éxito de tu proyecto.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-12) var(--spacing-8)' }}>
                        <StepItem num="01" title="Explora" text="Navega por nuestro catálogo de talentos premium filtrando por especialidad y ubicación." />
                        <StepItem num="02" title="Regístrate" text="Crea tu perfil empresarial de forma gratuita y accede a funciones exclusivas de reserva." />
                        <StepItem num="03" title="Selecciona" text="Guarda tus perfiles favoritos en listas personalizadas para cada proyecto o evento." />
                        <StepItem num="04" title="Cronograma" text="Define las fechas del evento, horas, lugar y tareas y requisitos específicos." />
                        <StepItem num="05" title="Envía solicitud" text="Envía la propuesta directamente a los talentos seleccionados con un solo clic." />
                        <StepItem num="06" title="Pago seguro" text="Realiza el depósito en garantía a través de nuestra pasarela de pagos encriptada." />
                        <StepItem num="07" title="Confirmación" text="Recibe la confirmación final y los datos de contacto directos para tu logística." />
                        <StepItem num="08" title="Califica" text="Evalúa el desempeño del talento para mantener los estándares de calidad de la red." />
                    </div>
                </div>
            </section>

            {/* SEGURIDAD Y BENEFICIOS SECTION */}
            <section style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'var(--gray-50)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-10)', letterSpacing: '-1px' }}>
                            Seguridad garantizada en cada paso
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
                            <CheckItem title="Cero fraudes de identidad" text="Validamos cada perfil físicamente y documentos oficiales para asegurar que el talento es quien dice ser." />
                            <CheckItem title="Pagos Protegidos (Escrow)" text="El dinero se libera al talento solo después de que confirmes que el servicio fue realizado satisfactoriamente." />
                            <CheckItem title="Contratos automáticos" text="Generamos contratos legales inteligentes que protegen tanto a la marca como al talento ante cualquier eventualidad." />
                            <CheckItem title="Soporte 24/7" text="Nuestro equipo de concierge está siempre disponible para asistir en la logística de último minuto." />
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: '#111827',
                        padding: 'var(--spacing-12)',
                        borderRadius: '16px',
                        color: 'white',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 'var(--spacing-10)', letterSpacing: '-1px' }}>Beneficios Corporativos</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <CheckCircle2 size={20} color="var(--color-accent)" />
                                <span style={{ fontWeight: 700, fontSize: '15px' }}>Facturación deducible inmediata</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <CheckCircle2 size={20} color="var(--color-accent)" />
                                <span style={{ fontWeight: 700, fontSize: '15px' }}>Acceso a talentos Internacionales</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <CheckCircle2 size={20} color="var(--color-accent)" />
                                <span style={{ fontWeight: 700, fontSize: '15px' }}>Historial de contrataciones centralizado</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <CheckCircle2 size={20} color="var(--color-accent)" />
                                <span style={{ fontWeight: 700, fontSize: '15px' }}>Gestión de múltiples eventos en paralelo</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', textAlign: 'center', marginBottom: 'var(--spacing-16)', letterSpacing: '-1px' }}>
                        Preguntas Frecuentes
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FAQItem question="¿Cómo se determinan las tarifas?" answer="Las tarifas son establecidas por cada talento basándose en su experiencia, mercado y requisitos del evento. AYRIS garantiza transparencia total sin cargos ocultos." />
                        <FAQItem question="¿Qué sucede si el modelo no asiste?" answer="Contamos con una política de reembolso total y un sistema de emergencia para encontrar un reemplazo calificado en tiempo récord." />
                        <FAQItem question="¿Es posible contratar para campañas internacionales?" answer="Sí, AYRIS gestiona la logística de talentos para producciones globales, incluyendo trámites y viáticos necesarios." />
                        <FAQItem question="¿Cómo se manejan los derechos de imagen?" answer="Todos los contratos incluyen cláusulas específicas sobre el uso de imagen, asegurando claridad legal para ambas partes." />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section style={{ padding: 'var(--spacing-12) 0 var(--spacing-24)' }}>
                <div className="container">
                    <div style={{
                        backgroundColor: '#0c0c0c',
                        borderRadius: '32px',
                        padding: 'var(--spacing-20) var(--spacing-10)',
                        textAlign: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: 'radial-gradient(circle at top right, #1a1a1a 0%, #0c0c0c 100%)'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h2 style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: 'var(--spacing-8)', lineHeight: 1, letterSpacing: '-2px' }}>
                                ¿Listo para elevar el estándar de tu próximo evento?
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--spacing-12)', maxWidth: '640px', margin: '0 auto var(--spacing-12)', lineHeight: 1.6, fontWeight: 500 }}>
                                Únete a las cientos de marcas que ya confían en AYRIS para encontrar el talento perfecto de manera eficiente y segura.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-6)' }}>
                                <Button variant="accent" size="lg" style={{ padding: '0 3.5rem', fontWeight: 900, borderRadius: '12px' }}>Comenzar ahora</Button>
                                <Button variant="outline" size="lg" style={{ padding: '0 3.5rem', fontWeight: 900, borderRadius: '12px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Hablar con un experto</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, text }: { icon: any; title: string, text: string }) => (
    <div style={{
        backgroundColor: 'white',
        padding: 'var(--spacing-12) var(--spacing-8)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        textAlign: 'left',
        border: '1px solid var(--gray-100)'
    }}>
        <div style={{ marginBottom: 'var(--spacing-8)' }}>{icon}</div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '15px' }}>{text}</p>
    </div>
);

const StepItem = ({ num, title, text }: { num: string; title: string; text: string }) => (
    <div>
        <div style={{
            fontSize: '12px',
            fontWeight: 900,
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-accent)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            marginBottom: 'var(--spacing-6)',
            boxShadow: '0 4px 10px rgba(234, 179, 8, 0.3)'
        }}>
            {num}
        </div>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-3)' }}>{title}</h4>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, fontWeight: 500 }}>{text}</p>
    </div>
);

const CheckItem = ({ title, text }: { title: string; text: string }) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <div style={{
            backgroundColor: 'var(--color-accent)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
        }}>
            <CheckCircle2 size={16} color="white" />
        </div>
        <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '6px' }}>{title}</h4>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{text}</p>
        </div>
    </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid var(--gray-100)' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: 'var(--spacing-8) 0',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left'
                }}
            >
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>{question}</span>
                <ChevronDown size={24} color="var(--gray-400)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s' }} />
            </button>
            <div style={{
                maxHeight: isOpen ? '400px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <p style={{ paddingBottom: 'var(--spacing-8)', color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '16px' }}>{answer}</p>
            </div>
        </div>
    );
};

export default HowItWorks;
