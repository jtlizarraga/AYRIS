import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../config/insforge';
import { Profile } from '../types/database';

interface AuthContextType {
    user: any | null;
    profile: Profile | null;
    loading: boolean;
    error: string | null;
    signUp: (email: string, password: string, userData: any) => Promise<{ data: any; error: any }>;
    signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await (supabase as any).database
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data as Profile);
            }
        } catch (error: any) {
            console.error('Error in fetchProfile:', error);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            console.log("Initializing Global Auth Context...");
            // Safety timeout to prevent infinite loading
            const timeout = setTimeout(() => {
                if (loading) {
                    console.warn("Auth initialization safety timeout reached");
                    setLoading(false);
                }
            }, 5000);

            try {
                // Try getCurrentUser which is often more reliable for initial check
                const { data, error }: any = await supabase.auth.getCurrentUser();
                console.log("Global user check result:", { data, error });

                if (data?.user) {
                    setUser(data.user);
                    await fetchProfile(data.user.id);
                } else {
                    // Fallback to getCurrentSession if user is not immediately available
                    const { data: sessionData }: any = await supabase.auth.getCurrentSession();
                    if (sessionData?.session?.user) {
                        setUser(sessionData.session.user);
                        await fetchProfile(sessionData.session.user.id);
                    }
                }
            } catch (err) {
                console.error("Global Auth init error:", err);
            } finally {
                clearTimeout(timeout);
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const signUp = async (email: string, password: string, userData: any) => {
        try {
            setLoading(true);
            setError(null);
            const { data: authData, error: authError } = await (supabase as any).auth.signUp({
                email,
                password,
                name: userData.full_name
            });

            if (authError) throw authError;

            if (authData?.user) {
                const { error: profileError } = await (supabase as any).database
                    .from('profiles')
                    .insert([{
                        id: authData.user.id,
                        email: email,
                        full_name: userData.full_name,
                        user_role: userData.user_role || 'client'
                    }]);

                if (profileError) throw profileError;

                if (!authData.requireEmailVerification) {
                    setUser(authData.user);
                    await fetchProfile(authData.user.id);
                }
            }
            return { data: authData, error: null };
        } catch (err: any) {
            setError(err.message);
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await (supabase as any).auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data?.user) {
                setUser(data.user);
                await fetchProfile(data.user.id);
            }
            return { data, error: null };
        } catch (err: any) {
            setError(err.message);
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            const { error } = await (supabase as any).auth.signOut();
            if (error) throw error;
            setUser(null);
            setProfile(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, error, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
