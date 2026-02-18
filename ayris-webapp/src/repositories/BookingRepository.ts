import { supabase } from '../config/insforge';
import { Booking } from '../types/database';

export const BookingRepository = {
    /**
     * Obtiene las reservas para un usuario específico según su rol.
     */
    async getByUser(userId: string, userRole: 'client' | 'model'): Promise<Booking[]> {
        let query = (supabase as any).database
            .from('bookings')
            .select(`
        *,
        event:events(event_name, event_date, location),
        model:models(stage_name)
      `);

        if (userRole === 'model') {
            const { data: modelData } = await (supabase as any).database.from('models')
                .select('id')
                .eq('profile_id', userId)
                .single();

            if (modelData) {
                query = query.eq('model_id', modelData.id);
            } else {
                return [];
            }
        } else {
            // Para clientes, la RLS o el filtrado por eventos es necesario
            // Por ahora confiamos en que el filtro lo haga la política o el backend
            query = query.not('id', 'is', null);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data as Booking[];
    },

    /**
     * Crea una nueva reserva en el sistema.
     */
    async create(bookingData: Partial<Booking>): Promise<Booking> {
        const { data, error } = await (supabase as any).database
            .from('bookings')
            .insert([bookingData])
            .select()
            .single();

        if (error) throw error;
        return data as Booking;
    }
};
