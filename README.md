# RidewithNanda

Trusted Taxi & Travel Network – 15 Years of Reliable Journeys

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- NextAuth.js (v4)
- Supabase
- TypeScript

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Environment Variables

Create a `.env.local` file with:

```env
# Admin Authentication
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password

# NextAuth Configuration
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Supabase Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Webhook URLs (Optional)
DRIVER_WEBHOOK_URL=https://your-driver-webhook-url
BOOKING_WEBHOOK_URL=https://your-booking-webhook-url
```

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Supabase Setup

Create these tables in your Supabase project:

### Database Tables

The complete SQL schema is in `supabase/migrations/20251101_initial_schema.sql`. Here's a summary:

### 1. `drivers` table
```sql
CREATE TABLE drivers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    car_model TEXT,
    years_experience TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `bookings` table
```sql
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup_city TEXT NOT NULL,
    drop_city TEXT NOT NULL,
    date TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. `subscribers` table
```sql
CREATE TABLE subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. `content` table
```sql
CREATE TABLE content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "homepageIntro" TEXT,
  "aboutHero" TEXT,
  "aboutStory" TEXT
);
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.local`
4. Update `NEXTAUTH_URL` to your Vercel domain
5. Deploy

## Admin Access

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- All admin routes are protected by authentication middleware

## Features

- ✅ Public website with responsive design
- ✅ Driver registration form
- ✅ Booking form  
- ✅ Email subscription (subscribers table)
- ✅ Admin dashboard (protected)
- ✅ Manage drivers, bookings, content
- ✅ Export subscribers to CSV
- ✅ Secure authentication with NextAuth



