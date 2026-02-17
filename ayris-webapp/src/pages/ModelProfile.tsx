import { useParams, Link } from 'react-router-dom';
import { getModelById } from '../data/models';
import Button from '../components/ui/Button';

const ModelProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const model = getModelById(Number(id));

    if (!model) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-10) 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-4)' }}>
                    Modelo no encontrado
                </h2>
                <Link to="/modelos">
                    <Button variant="primary">Volver al Catálogo</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: 'var(--spacing-8) 0' }}>
            <div className="container">
                <Link to="/modelos" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)', fontWeight: 700 }}>
                    <span>&larr;</span> VOLVER AL CATÁLOGO
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 2fr', gap: 'var(--spacing-10)' }}>
                    {/* Columna Izquierda: Media */}
                    <div>
                        <div style={{
                            position: 'relative',
                            height: '650px',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            <img
                                src={`https://images.unsplash.com/photo-${1500000000000 + model.id}?auto=format&fit=crop&q=80&w=800`}
                                alt={model.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800' }}
                            />
                        </div>

                        {/* Video Reel Placeholder */}
                        <div style={{
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--spacing-3)',
                            color: 'var(--color-white)',
                            cursor: 'pointer'
                        }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '10px' }}>▶</span>
                            </div>
                            <span style={{ fontWeight: 700, letterSpacing: '1px' }}>VER REEL DE VIDEO</span>
                        </div>
                    </div>

                    {/* Columna Derecha: Details */}
                    <div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-primary)', textTransform: 'uppercase', lineHeight: 1, marginBottom: 'var(--spacing-1)' }}>
                            {model.name}
                        </h1>
                        <p style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-6)' }}>
                            {model.category.toUpperCase()} / {model.location.toUpperCase()}
                        </p>

                        {/* Stats Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 'var(--spacing-4) 0',
                            borderTop: '1px solid var(--gray-200)',
                            borderBottom: '1px solid var(--gray-200)',
                            marginBottom: 'var(--spacing-8)'
                        }}>
                            <StatItem label="ALTURA" value={model.height} />
                            <StatItem label="BUSTO" value={model.stats.bust} />
                            <StatItem label="CINTURA" value={model.stats.waist} />
                            <StatItem label="CADERA" value={model.stats.hips} />
                            <StatItem label="ZAPATOS" value={model.stats.shoes} />
                        </div>

                        {/* Tarifas */}
                        <div style={{ marginBottom: 'var(--spacing-8)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}>TARIFAS</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-4)' }}>
                                <RateCard label="CONTRATACIONES" value={`$${model.hourlyRate}`} sub="X HORA" />
                                <RateCard label="1/2 JORNADA" value={`$${model.hourlyRate * 4}`} sub="4 HORAS" />
                                <RateCard label="JORNADA COMPLETA" value={`$${model.hourlyRate * 8}`} sub="8 HORAS" />
                            </div>
                        </div>

                        {/* Availability / Booking */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: 'var(--spacing-6)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--gray-100)'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 'var(--spacing-4)' }}>SOLICITAR DISPONIBILIDAD</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: 'var(--gray-500)', marginBottom: '5px' }}>FECHA DE INICIO</label>
                                    <input type="date" className="filter-select" style={{ width: '100%', appearance: 'auto', backgroundImage: 'none', padding: '0.75rem' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: 'var(--gray-500)', marginBottom: '5px' }}>TIPO DE EVENTO</label>
                                    <select className="filter-select" style={{ width: '100%' }}>
                                        <option>PASARELA</option>
                                        <option>EDIOTORIAL</option>
                                        <option>COMERCIAL</option>
                                    </select>
                                </div>
                            </div>
                            <Button variant="primary" size="lg" style={{ width: '100%', height: '60px', fontSize: '1.2rem' }}>RESERVAR AHORA</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
    <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{value}</p>
    </div>
);

const RateCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-100)', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', fontWeight: 900, color: 'var(--gray-500)', marginBottom: '5px' }}>{label}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-accent)' }}>{sub}</p>
    </div>
);

export default ModelProfile;
