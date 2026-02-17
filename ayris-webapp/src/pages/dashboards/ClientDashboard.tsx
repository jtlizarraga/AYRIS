import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';
import { useBookings } from '../../hooks/useBookings';
import CreateEventModal from '../../components/features/CreateEventModal';

const ClientDashboard: React.FC = () => {
    const { user, profile } = useAuth();
    const { events, loading: eventsLoading, createEvent } = useEvents(user?.id);
    const { bookings, loading: bookingsLoading } = useBookings(user?.id, 'client');
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const loading = eventsLoading || bookingsLoading;

    // Calcular métricas reales
    const activeEvents = events.filter(e => e.status !== 'completed' && e.status !== 'cancelled').length;
    const upcomingBookings = bookings.filter(b => b.booking_status === 'confirmed').length;

    // Mock de gasto (esto requeriría una tabla de pagos real)
    const totalSpent = bookings.reduce((acc, curr) => acc + (curr.agreed_rate || 0), 0);

    const handleCreateEvent = async (eventData: any) => {
        const { error } = await createEvent({
            ...eventData,
            client_id: user?.id,
            status: 'published' // Default to published for simplicity now
        });

        if (!error) {
            setIsCreateModalOpen(false);
        } else {
            alert('Error al crear evento: ' + error.message);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Cargando datos del dashboard...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        BIENVENIDO, {profile?.full_name?.toUpperCase() || 'CLIENTE'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 700 }}>GESTIONA TU TALENTO Y EVENTOS</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
                <Card style={{ borderLeft: '4px solid var(--color-primary)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>
                        Eventos Activos
                    </p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        {activeEvents}
                    </p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-emerald)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>
                        Reservas Confirmadas
                    </p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        {upcomingBookings}
                    </p>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--color-accent)', padding: 'var(--spacing-6)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--gray-400)', marginBottom: '5px', textTransform: 'uppercase' }}>
                        Inversión Total
                    </p>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: 0 }}>
                        <span style={{ color: 'var(--color-accent)' }}>$</span>{totalSpent.toLocaleString()}
                    </p>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)' }}>
                <div>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-4)' }}>
                        Reservas Recientes
                    </h2>
                    <Card>
                        {bookings.length === 0 ? (
                            <p className="text-muted text-center py-4">No tienes reservas activas.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {bookings.slice(0, 5).map(booking => (
                                    <li key={booking.id} style={{ padding: 'var(--spacing-3) 0', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>Reserva: {booking.event?.event_name || 'Evento sin nombre'}</p>
                                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                                                Modelo: {booking.model?.stage_name || 'Desconocido'} • Estado: {booking.booking_status}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">Ver Detalles</Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Mis Eventos Recientes</h2>
                        <Button size="sm" variant="outline" onClick={() => setIsCreateModalOpen(true)}>Nuevo Evento</Button>
                    </div>

                    {events.length === 0 ? (
                        <Card>
                            <p className="text-muted text-center py-4">No tienes eventos creados aún.</p>
                        </Card>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            {events.slice(0, 3).map(event => (
                                <Card key={event.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{event.event_name}</p>
                                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                                                {new Date(event.event_date).toLocaleDateString()} • {event.location}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                backgroundColor: event.status === 'published' ? 'var(--color-success)' : 'var(--gray-200)',
                                                color: event.status === 'published' ? 'white' : 'black'
                                            }}>
                                                {event.status}
                                            </span>
                                            <Button variant="outline" size="sm">Ver Detalles</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isCreateModalOpen && (
                <CreateEventModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateEvent}
                    loading={eventsLoading}
                />
            )}
        </div>
    );
};

export default ClientDashboard;
