import { useState, useEffect } from 'react';
import { supabase } from '../config/insforge';
import { Event } from '../types/database';

export const useEvents = (userId?: string) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('client_id', userId)
                .order('event_date', { ascending: true });

            if (error) throw error;
            setEvents(data as Event[]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async (eventData: Partial<Event>) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .insert([eventData])
                .select()
                .single();

            if (error) throw error;
            setEvents([...events, data as Event]);
            return { data, error: null };
        } catch (err: any) {
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [userId]);

    return {
        events,
        loading,
        error,
        fetchEvents,
        createEvent
    };
};
