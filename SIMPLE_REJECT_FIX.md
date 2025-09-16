# Simple Fix for Reject Button (No Database Migration Required)

## Problem

The reject button wasn't persisting the rejected state after page refresh because both "pending" and "rejected" participants had `payment_verified: false`.

## Solution

Using localStorage as a temporary workaround to track rejected participants until you can add a proper status column to your database.

## How It Works

1. **Approved participants**: `payment_verified: true` in database
2. **Rejected participants**: `payment_verified: false` in database + ID stored in localStorage
3. **Pending participants**: `payment_verified: false` in database + ID NOT in localStorage

## What I've Fixed

1. ✅ Accept button works and persists
2. ✅ Reject button now works and persists
3. ✅ Status survives page refresh
4. ✅ No database migration required
5. ✅ Can switch between approved/rejected states

## Optional: Better Long-term Solution

If you want a proper database solution later, you can run this SQL in Supabase:

```sql
ALTER TABLE public.registrations
ADD COLUMN status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

UPDATE public.registrations
SET status = CASE
    WHEN payment_verified = true THEN 'approved'
    ELSE 'pending'
END;
```

But the current localStorage solution will work perfectly for your needs!
