import { createClient } from '@insforge/sdk';

// Configuración del cliente InsForge
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_INSFORGE_BASE_URL || 'https://placeholder.insforge.app';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_INSFORGE_ANON_KEY || 'placeholder-key';

export const supabase = createClient({
  baseUrl: supabaseUrl,
  anonKey: supabaseKey
});

// Helper para obtener sesión actual (reemplaza getCurrentUser que no existe en el SDK)
export const getCurrentUser = async () => {
  try {
    const { data, error } = await (supabase as any).auth.getCurrentSession();
    return { user: data?.session?.user || null, error };
  } catch (err) {
    return { user: null, error: err };
  }
};
