-- Migration to add status column for better tracking of registration states
-- Run this in your Supabase SQL Editor

-- Add status column to track pending/approved/rejected states
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Update existing records based on payment_verified field
UPDATE public.registrations 
SET status = CASE 
    WHEN payment_verified = true THEN 'approved'
    ELSE 'pending'
END;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);