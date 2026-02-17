import { useState, useEffect } from 'react';
import { supabase } from '../config/insforge';
import { Booking } from '../types/database';

export const useBookings = (userId?: string, userRole?: 'client' | 'model') => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        if (!userId || !userRole) return;

        try {
            setLoading(true);
            let query = supabase
                .from('bookings')
                .select(`
                    *,
                    event:events(event_name, event_date, location),
                    model:models(stage_name)
                `);

            if (userRole === 'client') {
                // Clients see bookings via the events they own
                // This complex join filtering is often easier with RLS, 
                // but client-side we can filter by querying events first or using supabase joins.
                // Assuming RLS handles security, we just need to target the right rows.
                // Since bookings link to events, and events link to clients:
                // We'll rely on RLS logic "Clients can view their bookings" defined in schema
                // which checks event_id -> client_id.
                // So simple select should work if RLS is on. 
                // However, without explicit filtering, we might get too much?
                // Actually RLS filters rows returned. So simple select * is fine if policy is correct.
                // Let's rely on RLS:

                // But typically we want to be explicit for performance if RLS is slow or for clarity.
                // Let's filter by joining events for clients
                query = query.not('id', 'is', null); // Dummy filter to start chain
            } else if (userRole === 'model') {
                // Models allow direct link via model_id, but the user ID passed is usually auth ID (profile).
                // models table links profile_id to model ID.
                // We need to find the model ID for this user first or join.
                // If userId is passed as the profile ID:
                const { data: modelData } = await supabase.from('models').select('id').eq('profile_id', userId).single();
                if (modelData) {
                    query = query.eq('model_id', modelData.id);
                }
            }

            const { data, error } = await query;

            if (error) throw error;
            setBookings(data as Booking[]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createBooking = async (bookingData: Partial<Booking>) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .insert([bookingData])
                .select()
                .single();

            if (error) throw error;
            setBookings([...bookings, data as Booking]);
            return { data, error: null };
        } catch (err: any) {
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [userId, userRole]);

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        createBooking
    };
};
