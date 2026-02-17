import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useModels } from '../../hooks/useModels';
import { useBookings } from '../../hooks/useBookings';
import { Model } from '../../types/database';

const ModelDashboard: React.FC = () => {
    const { user, profile } = useAuth();
    const { getModelByProfileId, updateModel } = useModels();
    const [myModelData, setMyModelData] = useState<Model | null>(null);
    const { bookings } = useBookings(myModelData?.id, 'model'); // Fetch bookings once we have model ID

    useEffect(() => {
        const loadModelData = async () => {
            if (user?.id) {
                const modelData = await getModelByProfileId(user.id);
                setMyModelData(modelData);
            }
        };
        loadModelData();
    }, [user, getModelByProfileId]);

    const handleToggleAvailability = async () => {
        if (!myModelData) return;

        const newStatus = !myModelData.is_available;
        const { error } = await updateModel(myModelData.id, { is_available: newStatus });

        if (!error) {
            setMyModelData(prev => prev ? { ...prev, is_available: newStatus } : null);
        } else {
            alert('Error actualizando disponibilidad');
        }
    };

    // Calcular métricas
    const upcomingBookings = bookings.filter(b => b.booking_status === 'confirmed').length;
    const pendingEarnings = bookings
        .filter(b => b.booking_status === 'confirmed' || b.booking_status === 'completed')
        .reduce((acc, curr) => acc + (curr.agreed_rate || 0), 0);

    // Perfil completo placeholder logic (podría ser real validando campos)
    const isProfileComplete = myModelData?.bio && myModelData?.portfolio_url ? true : false;
    const profileCompleteness = isProfileComplete ? 100 : 80; // Simplificado

    if (!user) return <div>Cargando sesión...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        HOLA, {profile?.full_name?.toUpperCase() || 'TALENTO'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 700 }}>BIENVENIDO A TU PANEL DE CONTROL</p>
                </div>
                {myModelData && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-400)', margin: 0 }}>MI ESTADO</p>
                            <span style={{
                                fontWeight: 800,
                                color: myModelData.is_available ? 'var(--color-emerald)' : 'var(--gray-400)',
                                fontSize: 'var(--font-size-sm)',
                                textTransform: 'uppercase'
                            }}>
                                {myModelData.is_available ? 'DISPONIBLE' : 'NO DISPONIBLE'}
                            </span>
                        </div>
                        <Button size="md" variant={myModelData.is_available ? "outline" : "primary"} onClick={handleToggleAvailability} style={{ borderRadius: 'var(--radius-full)' }}>
                            {myModelData.is_available ? 'PAUSAR' : 'ACTIVAR'}
                        </Button>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
                <Card style={{ borderLeft: '4px solid var(--color-primary)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>
                        Próximos Eventos
                    </p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        {upcomingBookings}
                    </p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-accent)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>
                        Ingresos Estimados
                    </p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        <span style={{ color: 'var(--color-accent)' }}>$</span>{pendingEarnings.toLocaleString()}
                    </p>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-4)' }}>
                <Card>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>Mis Reservas</h3>
                    {bookings.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                            No tienes reservas aún.
                        </div>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {bookings.map(booking => (
                                <li key={booking.id} style={{ padding: 'var(--spacing-3) 0', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>{booking.event?.event_name || 'Evento'}</p>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                                            {booking.event?.event_date ? new Date(booking.event.event_date).toLocaleDateString() : 'Fecha pendiente'} • {booking.booking_status}
                                        </p>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>${booking.agreed_rate}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>

                <Card>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>Estado del Perfil</h3>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            border: '4px solid ' + (profileCompleteness === 100 ? 'var(--color-success)' : 'var(--color-warning)'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto var(--spacing-3)',
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 700,
                            color: profileCompleteness === 100 ? 'var(--color-success)' : 'var(--color-warning)'
                        }}>
                            {profileCompleteness}%
                        </div>
                        <p style={{ color: 'var(--gray-600)' }}>
                            {profileCompleteness === 100 ? 'Tu perfil está completo.' : 'Completa tu bio y portafolio.'}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ModelDashboard;
