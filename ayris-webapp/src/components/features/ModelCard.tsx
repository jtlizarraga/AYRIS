import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';

import { Model } from '../../types/database';

interface ModelCardProps {
    model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
    const navigate = useNavigate();

    const profileImage = (model as any).portfolio?.find((p: any) => p.image_type === 'profile')?.image_url
        || (model as any).profile?.avatar_url
        || 'https://via.placeholder.com/300x400?text=No+Image';

    return (
        <Card onClick={() => navigate(`/modelos/${model.id}`)}>
            <div style={{
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-2)'
            }}>
                <img
                    src={profileImage}
                    alt={model.stage_name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-1)' }}>
                <h3 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    margin: 0,
                    color: 'var(--color-primary)'
                }}>
                    {model.stage_name}
                </h3>
                {model.featured && (
                    <span style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-primary)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600
                    }}>
                        ⭐ Destacado
                    </span>
                )}
            </div>

            <p style={{
                color: 'var(--gray-600)',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-2)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {model.bio || 'Sin descripción'}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-2)', flexWrap: 'wrap' }}>
                {(model.category || []).map((cat, index) => (
                    <span key={index} style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--gray-700)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)'
                    }}>
                        {cat}
                    </span>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--gray-600)'
                }}>
                    ${(model.day_rate || 0).toLocaleString()}/día
                </span>
                <span style={{
                    color: model.is_available ? 'var(--color-success)' : 'var(--color-error)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600
                }}>
                    {model.is_available ? '● Disponible' : '● No disponible'}
                </span>
            </div>
        </Card>
    );
};

export default ModelCard;
