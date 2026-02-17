import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CreateEventModalProps {
    onClose: () => void;
    onSubmit: (eventData: any) => Promise<void>;
    loading?: boolean;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, onSubmit, loading = false }) => {
    const [formData, setFormData] = useState({
        event_name: '',
        event_type: 'photoshoot',
        event_date: '',
        location: '',
        duration_hours: 4,
        budget: 0,
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Crear Nuevo Evento</h2>
                        <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
                            <input
                                type="text"
                                name="event_name"
                                required
                                value={formData.event_name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                                <select
                                    name="event_type"
                                    value={formData.event_type}
                                    onChange={handleChange}
                                    style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <option value="photoshoot">Sesión de Fotos</option>
                                    <option value="runway">Pasarela</option>
                                    <option value="commercial">Comercial</option>
                                    <option value="event">Evento / Protocolo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                                <input
                                    type="date"
                                    name="event_date"
                                    required
                                    value={formData.event_date}
                                    onChange={handleChange}
                                    style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duración (horas)</label>
                                <input
                                    type="number"
                                    name="duration_hours"
                                    min="1"
                                    value={formData.duration_hours}
                                    onChange={handleChange}
                                    style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Presupuesto ($)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    min="0"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creando...' : 'Crear Evento'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreateEventModal;
