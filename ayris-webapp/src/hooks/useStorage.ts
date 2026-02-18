import { supabase } from '../config/insforge';

export const useStorage = () => {
    const uploadModelPhoto = async (file: File, modelId: string) => {
        try {
            const fileName = `${modelId}/${Date.now()}_${file.name}`;

            const { data, error } = await (supabase as any).storage
                .from('model-portfolios')
                .upload(fileName, file);

            if (error) throw error;

            return {
                data: {
                    path: data.key,
                    url: data.url
                },
                error: null
            };
        } catch (err: any) {
            return { data: null, error: err.message || err };
        }
    };

    const uploadAvatar = async (file: File, userId: string) => {
        try {
            const fileName = `${userId}/avatar_${Date.now()}.jpg`;

            const { data, error } = await (supabase as any).storage
                .from('profile-avatars')
                .upload(fileName, file);

            if (error) throw error;

            return {
                data: {
                    path: data.key,
                    url: data.url
                },
                error: null
            };
        } catch (err: any) {
            return { data: null, error: err.message || err };
        }
    };

    const deleteFile = async (bucket: string, filePath: string) => {
        try {
            const { error } = await (supabase as any).storage
                .from(bucket)
                .remove(filePath);

            if (error) throw error;
            return { success: true, error: null };
        } catch (err: any) {
            return { success: false, error: err.message || err };
        }
    };

    return { uploadModelPhoto, uploadAvatar, deleteFile };
};
