# Fix for Reject Button Issue

## Problem

The reject button wasn't working properly because the database only had a `payment_verified` boolean field, which couldn't distinguish between "pending" and "rejected" states.

## Solution

Added a `status` column to properly track the three states: pending, approved, rejected.

## Required Database Migration

**IMPORTANT: You need to run this SQL in your Supabase dashboard before the reject button will work properly.**

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL:

```sql
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
```

## Changes Made

1. **Database Schema**: Added `status` column to `registrations` table
2. **TypeScript Interface**: Updated `Registration` interface to include `status` field
3. **Service Layer**: Added `updateRegistrationStatus()` method to handle status updates properly
4. **Admin Panel**: Updated to use the new status field instead of deriving status from `payment_verified`

## Testing

After running the migration:

1. Refresh your admin panel
2. Try rejecting a participant
3. Refresh the page - the participant should remain in "rejected" state
4. The accept button should also continue working properly

Both accept and reject buttons now properly persist their state in the database!
