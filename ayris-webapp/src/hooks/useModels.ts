import { useState, useEffect } from 'react';
import { supabase } from '../config/insforge';
import { Model } from '../types/database';

export const useModels = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = async (category?: string) => {
        try {
            setLoading(true);
            let query = supabase
                .from('models')
                .select(`
                    *,
                    profile:profiles(full_name, user_role)
                `)
                .eq('is_available', true);

            if (category) {
                query = query.contains('category', [category]);
            }

            const { data, error } = await query;

            if (error) throw error;
            setModels(data as Model[]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getModelById = async (id: string) => {
        try {
            const { data, error } = await supabase
                .from('models')
                .select(`
                    *,
                    profile:profiles(full_name, email)
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data as Model;
        } catch (err: any) {
            console.error('Error fetching model details:', err);
            return null;
        }
    };

    const getModelByProfileId = async (profileId: string) => {
        try {
            const { data, error } = await supabase
                .from('models')
                .select('*')
                .eq('profile_id', profileId)
                .single();

            if (error) throw error;
            return data as Model;
        } catch (err: any) {
            console.error('Error fetching model by profile ID:', err);
            return null;
        }
    };

    const updateModel = async (modelId: string, updates: Partial<Model>) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('models')
                .update(updates)
                .eq('id', modelId)
                .select()
                .single();

            if (error) throw error;

            // Update local state if necessary
            setModels(prev => prev.map(m => m.id === modelId ? (data as Model) : m));
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
