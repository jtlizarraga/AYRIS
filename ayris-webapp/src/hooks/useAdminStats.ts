import { useState, useEffect } from 'react';
import { supabase } from '../config/insforge';

export const useAdminStats = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeModels: 0,
        totalBookings: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setLoading(true);

            // 1. Total Users
            const { count: usersCount, error: usersError } = await (supabase as any).database
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            if (usersError) throw usersError;

            // 2. Active Models
            const { count: modelsCount, error: modelsError } = await (supabase as any).database
                .from('models')
                .select('*', { count: 'exact', head: true })
                .eq('is_available', true);

            if (modelsError) throw modelsError;

            // 3. Total Bookings (This month - simplified to all for now or logic can be added)
            const { count: bookingsCount, error: bookingsError } = await (supabase as any).database
                .from('bookings')
                .select('*', { count: 'exact', head: true });

            if (bookingsError) throw bookingsError;

            // 4. Revenue (Requires fetching data to sum)
            const { data: revenueData, error: revenueError } = await (supabase as any).database
                .from('bookings')
                .select('agreed_rate')
                .neq('booking_status', 'cancelled'); // Count valid bookings

            if (revenueError) throw revenueError;

            const totalRevenue = revenueData?.reduce((acc: number, curr: any) => acc + (curr.agreed_rate || 0), 0) || 0;

            setStats({
                totalUsers: usersCount || 0,
                activeModels: modelsCount || 0,
                totalBookings: bookingsCount || 0,
                totalRevenue
            });

        } catch (err: any) {
            console.error('Error fetching admin stats:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { stats, loading, error, refetch: fetchStats };
};
