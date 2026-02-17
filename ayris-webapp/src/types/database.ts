export interface Profile {
    id: string; // uuid
    email: string;
    full_name: string;
    user_role: 'admin' | 'client' | 'model';
    created_at: string;
}

export interface Model {
    id: string; // uuid
    profile_id: string; // uuid
    stage_name: string;
    bio?: string;
    height_cm?: number;
    bust_cm?: number;
    waist_cm?: number;
    hips_cm?: number;
    hair_color?: string;
    eye_color?: string;
    category?: string[];
    hourly_rate?: number;
    day_rate?: number;
    is_available: boolean;
    featured: boolean;
    created_at: string;
    updated_at: string;
    // Joined fields
    profile?: Profile;
    portfolio_url?: string; // Derived or separate table
}

export interface Event {
    id: string; // uuid
    client_id: string; // uuid
    event_name: string;
    event_type: string;
    event_date: string; // date string YYYY-MM-DD
    location: string;
    duration_hours: number;
    budget?: number;
    status: 'draft' | 'published' | 'completed' | 'cancelled';
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: string; // uuid
    event_id: string;
    model_id: string;
    booking_status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    booking_date: string; // timestamp
    start_time: string; // time
    end_time: string; // time
    agreed_rate: number;
    special_requirements?: string;
    created_at: string;
    updated_at: string;
    // Joined fields
    event?: Event;
    model?: Model;
}
