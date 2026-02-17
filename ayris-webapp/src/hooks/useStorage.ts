import { supabase } from '../config/insforge';

export const useStorage = () => {
    const uploadModelPhoto = async (file: File, modelId: string) => {
        try {
            const fileName = `${modelId}/${Date.now()}_${file.name}`;

            const { data, error } = await supabase.storage
                .from('model-portfolios')
                .upload(fileName, file);

            if (error) throw error;

            // Obtener URL pública
            const { data: urlData } = supabase.storage
                .from('model-portfolios')
                .getPublicUrl(fileName);

            return {
                data: {
                    path: fileName,
                    url: urlData.publicUrl
                },
                error: null
            };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    };

    const uploadAvatar = async (file: File, userId: string) => {
        try {
            const fileName = `${userId}/avatar_${Date.now()}.jpg`;

            const { data, error } = await supabase.storage
                .from('profile-avatars')
                .upload(fileName, file);

            if (error) throw error;

            const { data: urlData } = supabase.storage
                .from('profile-avatars')
                .getPublicUrl(fileName);

            return {
                data: {
                    path: fileName,
                    url: urlData.publicUrl
                },
                error: null
            };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    };

    const deleteFile = async (bucket: string, filePath: string) => {
        try {
            const { error } = await supabase.storage
                .from(bucket)
                .remove([filePath]);

            if (error) throw error;
            return { success: true, error: null };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return { uploadModelPhoto, uploadAvatar, deleteFile };
};
