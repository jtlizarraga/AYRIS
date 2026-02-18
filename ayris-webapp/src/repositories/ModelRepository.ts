import { supabase } from '../config/insforge';
import { Model } from '../types/database';

export const ModelRepository = {
    /**
     * Obtiene todos los modelos disponibles, incluyendo información de su perfil.
     */
    async getAll(category?: string): Promise<Model[]> {
        let query = (supabase as any).database
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
        return data as Model[];
    },

    /**
     * Obtiene un modelo por su ID único.
     */
    async getById(id: string): Promise<Model | null> {
        const { data, error } = await (supabase as any).database
            .from('models')
            .select(`
        *,
        profile:profiles(full_name, email)
      `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching model details:', error);
            return null;
        }
        return data as Model;
    },

    /**
     * Obtiene un modelo asociado a un ID de perfil de usuario.
     */
    async getByProfileId(profileId: string): Promise<Model | null> {
        const { data, error } = await (supabase as any).database
            .from('models')
            .select('*')
            .eq('profile_id', profileId)
            .single();

        if (error) {
            console.error('Error fetching model by profile ID:', error);
            return null;
        }
        return data as Model;
    },

    /**
     * Actualiza la información de un modelo.
     */
    async update(id: string, updates: Partial<Model>): Promise<Model> {
        const { data, error } = await (supabase as any).database
            .from('models')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Model;
    }
};
