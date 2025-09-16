import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the database types
export interface Registration {
  id?: string;
  full_name: string;
  phone_number: string;
  email: string;
  college: string;
  year: string;
  startup_idea?: string;
  payment_screenshot_url?: string;
  created_at?: string;
  payment_verified?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}
