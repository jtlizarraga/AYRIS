import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname !== '/registro');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'client' | 'model'>('client');
    const { signIn, signUp, loading, error: authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let result;
        if (isLogin) {
            result = await signIn(email, password);
        } else {
            result = await signUp(email, password, {
                full_name: fullName,
                user_role: role
            });
        }

        if (result.error) {
            console.error(result.error);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfb', overflow: 'hidden' }}>
            {/* OFFLINE BANNER */}
            <div style={{
                backgroundColor: '#f25a07',
                color: 'white',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.8px',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>⚠️</span>
                    MODO OFFLINE ACTIVO: LOS CAMBIOS SE SINCRONIZARÁN AUTOMÁTICAMENTE AL VOLVER A CONECTARSE.
                </div>
                <button style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)')}
                >
                    Sincronizar Ahora
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex' }}>
                {/* LEFT COLUMN - IMAGE & QUOTE */}
                <div className="animate-fade-in" style={{
                    flex: 1.2,
                    position: 'relative',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000"
                        alt="Elegance"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(100%) contrast(1.1) brightness(0.8)',
                            transition: 'transform 10s ease-out',
                        }}
                        onLoad={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '0',
                        right: '0',
                        textAlign: 'center',
                        padding: '0 60px',
                        color: 'white',
                        zIndex: 2
                    }}>
                        <p className="animate-slide-up stagger-3" style={{
                            fontSize: '2.8rem',
                            fontWeight: 300,
                            fontStyle: 'italic',
                            marginBottom: '24px',
                            lineHeight: 1.1,
                            letterSpacing: '-1px'
                        }}>
                            "La elegancia no consiste en destacar, sino en ser recordado."
                        </p>
                        <div className="animate-fade-in stagger-5" style={{ height: '1px', width: '60px', backgroundColor: 'var(--color-accent)', margin: '0 auto 24px' }}></div>
                        <p className="animate-fade-in stagger-5" style={{
                            fontSize: '13px',
                            fontWeight: 900,
                            letterSpacing: '6px',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                            opacity: 0.9
                        }}>
                            GIORGIO ARMANI
                        </p>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)'
                    }}></div>
                </div>

                {/* RIGHT COLUMN - FORM */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px 60px',
                    justifyContent: 'center',
                    position: 'relative',
                    backgroundImage: 'radial-gradient(circle at top right, rgba(234, 179, 8, 0.03) 0%, transparent 40%)'
                }}>
                    <div className="animate-scale-in stagger-1" style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '80px' }}>
                            <div className="glass-morphism" style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                fontWeight: 900,
                                fontSize: '22px',
                                color: 'black',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                A
                            </div>
                            <span style={{ fontWeight: 900, color: 'black', fontSize: '22px', letterSpacing: '2px' }}>AYRIS <span style={{ fontWeight: 300, fontSize: '14px', color: 'var(--gray-400)', letterSpacing: '0' }}>MODELS</span></span>
                        </div>

                        <h2 className="animate-slide-up stagger-2" style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111', marginBottom: '15px', letterSpacing: '-2px' }}>
                            {isLogin ? 'Bienvenido' : 'Únete a la Élite'}
                        </h2>
                        <p className="animate-slide-up stagger-2" style={{ color: 'var(--gray-500)', fontSize: '16px', fontWeight: 500, marginBottom: '50px', maxWidth: '380px' }}>
                            Accede a la red de talento más exclusiva de la industria.
                        </p>

                        {/* TABS CON GLASSMORPHISM */}
                        <div className="glass-morphism animate-slide-up stagger-3" style={{
                            display: 'flex',
                            borderRadius: '16px',
                            padding: '6px',
                            marginBottom: '45px',
                        }}>
                            <button
                                onClick={() => setIsLogin(true)}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontWeight: 800,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    backgroundColor: isLogin ? 'var(--color-accent)' : 'transparent',
                                    color: isLogin ? 'black' : 'var(--gray-400)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    boxShadow: isLogin ? 'var(--shadow-md)' : 'none'
                                }}
                            >
                                Acceso
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontWeight: 800,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    backgroundColor: !isLogin ? 'var(--color-accent)' : 'transparent',
                                    color: !isLogin ? 'black' : 'var(--gray-400)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    boxShadow: !isLogin ? 'var(--shadow-md)' : 'none'
                                }}
                            >
                                Registro
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="animate-fade-in stagger-4">
                            {!isLogin && (
                                <>
                                    <div style={{ marginBottom: '28px' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '11px',
                                            fontWeight: 900,
                                            color: 'var(--gray-800)',
                                            marginBottom: '10px',
                                            letterSpacing: '1.5px'
                                        }}>NOMBRE COMPLETO</label>
                                        <input
                                            type="text"
                                            placeholder="Introduce tu nombre completo"
                                            style={{
                                                width: '100%',
                                                padding: '18px 24px',
                                                borderRadius: '14px',
                                                border: '1px solid #edf2f7',
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                outline: 'none',
                                                backgroundColor: '#fff',
                                                transition: 'all 0.3s',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                            }}
                                            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                                            onBlur={(e) => (e.currentTarget.style.borderColor = '#edf2f7')}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div style={{ marginBottom: '28px' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '11px',
                                            fontWeight: 900,
                                            color: 'var(--gray-800)',
                                            marginBottom: '10px',
                                            letterSpacing: '1.5px'
                                        }}>TIPO DE CUENTA</label>
                                        <div style={{ position: 'relative' }}>
                                            <select
                                                style={{
                                                    width: '100%',
                                                    padding: '18px 24px',
                                                    borderRadius: '14px',
                                                    border: '1px solid #edf2f7',
                                                    fontSize: '15px',
                                                    fontWeight: 600,
                                                    outline: 'none',
                                                    backgroundColor: '#fff',
                                                    appearance: 'none',
                                                    transition: 'all 0.3s'
                                                }}
                                                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                                                onBlur={(e) => (e.currentTarget.style.borderColor = '#edf2f7')}
                                                value={role}
                                                onChange={(e) => setRole(e.target.value as 'client' | 'model')}
                                                required
                                            >
                                                <option value="client">Soy Cliente (Empresa/Agencia)</option>
                                                <option value="model">Soy Modelo (Talento)</option>
                                            </select>
                                            <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gray-400)' }}>
                                                ▼
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div style={{ marginBottom: '28px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: 900,
                                    color: 'var(--gray-800)',
                                    marginBottom: '10px',
                                    letterSpacing: '1.5px'
                                }}>CORREO ELECTRÓNICO</label>
                                <input
                                    type="email"
                                    placeholder="ejemplo@empresa.com"
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px',
                                        borderRadius: '14px',
                                        border: '1px solid #edf2f7',
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        outline: 'none',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = '#edf2f7')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <label style={{
                                        fontSize: '11px',
                                        fontWeight: 900,
                                        color: 'var(--gray-800)',
                                        letterSpacing: '1.5px'
                                    }}>CONTRASEÑA</label>
                                    {isLogin && <a href="#" style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-accent)', textDecoration: 'none' }}>¿OLVIDASTE TU CONTRASEÑA?</a>}
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px',
                                        borderRadius: '14px',
                                        border: '1px solid #edf2f7',
                                        fontSize: '15px',
                                        outline: 'none',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = '#edf2f7')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {authError && (
                                <div className="animate-fade-in" style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    marginBottom: '24px',
                                    border: '1px solid rgba(239, 68, 68, 0.1)'
                                }}>
                                    <p style={{ color: 'var(--color-error)', fontSize: '13px', fontWeight: 700, margin: 0 }}>{authError}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="accent"
                                size="lg"
                                style={{
                                    width: '100%',
                                    padding: '22px',
                                    fontSize: '1.1rem',
                                    fontWeight: 900,
                                    borderRadius: '18px',
                                    boxShadow: 'var(--shadow-accent)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    transition: 'all 0.4s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                disabled={loading}
                            >
                                {loading ? 'Procesando...' : isLogin ? 'Ingresar Ahora' : 'Crear Perfil Premium'}
                            </Button>
                        </form>

                        <div className="animate-fade-in stagger-5" style={{ textAlign: 'center', marginTop: '50px' }}>
                            <p style={{
                                fontSize: '11px',
                                color: 'var(--gray-400)',
                                lineHeight: 1.8,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Al continuar, aceptas nuestros <a href="#" style={{ color: 'black', textDecoration: 'underline' }}>términos corporativos</a> y <a href="#" style={{ color: 'black', textDecoration: 'underline' }}>política de privacidad</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
