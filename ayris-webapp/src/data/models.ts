export interface Model {
    id: number;
    name: string;
    category: string;
    height: string;
    location: string;
    bio: string;
    images: string[];
    stats: {
        bust: string;
        waist: string;
        hips: string;
        shoes: string;
        eyes: string;
        hair: string;
    };
    hourlyRate: number;
}

export const models: Model[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Modelo ${i + 1}`,
    category: i % 2 === 0 ? 'Moda' : 'Comercial',
    height: '1.78m',
    location: 'Ciudad de México',
    bio: 'Modelo profesional con 3 años de experiencia en pasarela y fotografía editorial. Apasionada por el arte y la moda sostenible.',
    images: Array(4).fill(null), // Placeholders
    stats: {
        bust: '85cm',
        waist: '60cm',
        hips: '90cm',
        shoes: '38',
        eyes: 'Cafés',
        hair: 'Castaño'
    },
    hourlyRate: 1500
}));

export const getModelById = (id: number): Model | undefined => {
    return models.find(m => m.id === id);
};
