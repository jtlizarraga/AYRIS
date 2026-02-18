import { useState, useEffect } from 'react';
import { Booking } from '../types/database';
import { BookingRepository } from '../repositories/BookingRepository';

export const useBookings = (userId?: string, userRole?: 'client' | 'model') => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        if (!userId || !userRole) return;

        try {
            setLoading(true);
            const data = await BookingRepository.getByUser(userId, userRole);
            setBookings(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createBooking = async (bookingData: Partial<Booking>) => {
        try {
            setLoading(true);
            const data = await BookingRepository.create(bookingData);
            setBookings(prev => [...prev, data]);
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
