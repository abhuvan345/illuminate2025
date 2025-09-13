# Illuminate 2025 - Registration System with Supabase Integration

This project is a React TypeScript application for managing registrations for the Illuminate 2025 workshop, integrated with Supabase for data storage and file uploads.

## Features

- ✅ Registration form with file upload for payment screenshots
- ✅ Supabase database integration for storing registration data
- ✅ Image upload to Supabase Storage
- ✅ Admin panel for viewing and managing registrations
- ✅ Payment verification system

## Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase Project**

   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Update Environment Variables**

   - The `.env` file already contains your Supabase credentials:

   ```
   VITE_SUPABASE_URL=https://nhzfwhxwaydpipqloyvz.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oemZ3aHh3YXlkcGlwcWxveXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjkzMzUsImV4cCI6MjA3MzM0NTMzNX0.l9vFa2vJamSEFk_15VLbKPVY1P9i3w2BShm1DxCO_8E
   ```

3. **Run the SQL Setup Script**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase-setup.sql`
   - Run the script to create the necessary tables and storage buckets

### 2. Local Development Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Main application: http://localhost:5173/
   - Admin panel: http://localhost:5173/admin (username: admin, password: illuminate2025)

## Database Schema

### `registrations` table

- `id` (UUID, Primary Key)
- `full_name` (VARCHAR, NOT NULL)
- `phone_number` (VARCHAR, NOT NULL)
- `email` (VARCHAR, NOT NULL, UNIQUE)
- `college` (VARCHAR, NOT NULL)
- `year` (VARCHAR, NOT NULL)
- `startup_idea` (TEXT, Optional)
- `payment_screenshot_url` (TEXT, Optional)
- `payment_verified` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Storage Buckets

- `registration-files`: For storing payment screenshots

## Usage

### Registration Flow

1. User fills out the registration form
2. Uploads payment screenshot (JPG, PNG, PDF up to 5MB)
3. Form data is submitted to Supabase
4. Payment screenshot is uploaded to Supabase Storage
5. Registration record is created with pending status

### Admin Panel Features

- View all registrations
- Search by name, email, or college
- Filter by payment status
- Approve or reject registrations
- Export data to CSV
- View payment screenshots

## Security Notes

- Row Level Security (RLS) is enabled on the registrations table
- Public policies allow registration submissions and admin operations
- File uploads are restricted to the registration-files bucket
- Admin authentication is basic (use proper auth in production)

## File Structure

```
src/
├── components/
│   └── RegistrationForm.tsx    # Main registration form with Supabase integration
├── pages/
│   └── AdminPanel.tsx          # Admin dashboard for managing registrations
├── lib/
│   ├── supabase.ts            # Supabase client configuration
│   └── registrationService.ts  # Service layer for database operations
└── ...
```

## Production Deployment

1. **Environment Variables**: Update production environment variables
2. **Authentication**: Implement proper admin authentication
3. **Email Notifications**: Add email service for confirmations
4. **File Validation**: Add server-side file validation
5. **Rate Limiting**: Implement rate limiting for form submissions

## Troubleshooting

### Common Issues

1. **"Failed to upload payment screenshot"**

   - Check if the storage bucket exists
   - Verify storage policies are set correctly
   - Ensure file size is under 5MB

2. **"Failed to create registration"**

   - Check database connection
   - Verify table exists and has correct permissions
   - Check for unique email constraint violations

3. **Admin panel not loading data**
   - Verify Supabase connection
   - Check browser console for errors
   - Ensure RLS policies allow SELECT operations
