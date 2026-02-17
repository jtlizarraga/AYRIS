import { createClient } from '@insforge/sdk';

// Configuración del cliente InsForge
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_INSFORGE_BASE_URL || 'https://placeholder.insforge.app';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_INSFORGE_ANON_KEY || 'placeholder-key';

export const supabase = createClient({
  baseUrl: supabaseUrl,
  anonKey: supabaseKey
});

// Helper para obtener usuario actual
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getCurrentUser();
  return { user: data?.user || null, error };
};

// Helper para rutas protegidas
export const requireAuth = async () => {
  const { user, error } = await getCurrentUser();
  if (!user || error) throw new Error('Unauthorized');
  return user;
};
