-- SQL commands to run in your Supabase SQL Editor

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    college VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    startup_idea TEXT,
    payment_screenshot_url TEXT,
    payment_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create storage bucket for registration files
INSERT INTO storage.buckets (id, name, public)
VALUES ('registration-files', 'registration-files', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Create storage policy to allow public uploads
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'registration-files');

-- 4. Create storage policy to allow public downloads
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'registration-files');

-- 5. Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 6. Create policy to allow public inserts (for registration)
DROP POLICY IF EXISTS "Allow public inserts" ON public.registrations;
CREATE POLICY "Allow public inserts" ON public.registrations
FOR INSERT WITH CHECK (true);

-- 7. Create policy to allow public selects (for admin dashboard)
DROP POLICY IF EXISTS "Allow public selects" ON public.registrations;
CREATE POLICY "Allow public selects" ON public.registrations
FOR SELECT USING (true);

-- 8. Create policy to allow public updates (for payment verification)
DROP POLICY IF EXISTS "Allow public updates" ON public.registrations;
CREATE POLICY "Allow public updates" ON public.registrations
FOR UPDATE USING (true);

-- 9. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS handle_registrations_updated_at ON public.registrations;
CREATE TRIGGER handle_registrations_updated_at
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 11. Create index on email for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);

-- 12. Create index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);
