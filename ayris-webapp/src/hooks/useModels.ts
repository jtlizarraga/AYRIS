import { useState, useEffect } from 'react';
import { Model } from '../types/database';
import { ModelRepository } from '../repositories/ModelRepository';

export const useModels = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = async (category?: string) => {
        try {
            setLoading(true);
            const data = await ModelRepository.getAll(category);
            setModels(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getModelById = async (id: string) => {
        return await ModelRepository.getById(id);
    };

    const getModelByProfileId = async (profileId: string) => {
        return await ModelRepository.getByProfileId(profileId);
    };

    const updateModel = async (modelId: string, updates: Partial<Model>) => {
        try {
            setLoading(true);
            const data = await ModelRepository.update(modelId, updates);
            setModels(prev => prev.map(m => m.id === modelId ? data : m));
            return { data, error: null };
        } catch (err: any) {
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return {
        models,
        loading,
        error,
        fetchModels,
        getModelById,
        getModelByProfileId,
        updateModel
    };
};
