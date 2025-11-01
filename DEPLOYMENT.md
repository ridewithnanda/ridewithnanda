# Deployment Checklist

## 1. Environment Setup

- [ ] Copy `.env.example` to `.env.local` and fill in values
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Set `SUPABASE_SERVICE_KEY` (service role key — server-side only)
- [ ] Set `NEXTAUTH_URL` (use https:// in production)
- [ ] Generate and set `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
- [ ] Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` if using admin features

## 2. Supabase Setup

### Create Tables
- [ ] Open Supabase Dashboard -> SQL Editor
- [ ] Copy and paste contents of `supabase/migrations/20251101_initial_schema.sql`
- [ ] Execute the SQL to create tables and indexes

### Verify Tables
- [ ] Check `subscribers` table exists with correct columns
- [ ] Check `drivers` table exists with correct columns
- [ ] Check `bookings` table exists with correct columns
- [ ] Verify indexes were created
- [ ] Test inserting a row in each table

### Security
- [ ] Verify RLS (Row Level Security) is enabled
- [ ] Check service role key has necessary permissions
- [ ] Review table policies

## 3. Application Testing

### Forms
- [ ] Test Subscribe form
  - [ ] Submits successfully
  - [ ] Shows success message
  - [ ] Handles duplicate emails
  - [ ] Clears form after submission

- [ ] Test Booking form
  - [ ] All required fields work
  - [ ] Date picker works
  - [ ] Submits successfully
  - [ ] Shows success message
  - [ ] Form clears after submission

- [ ] Test Driver form
  - [ ] All required fields work
  - [ ] Optional fields work
  - [ ] Submits successfully
  - [ ] Shows success message
  - [ ] Form clears after submission

### Admin Features
- [ ] Test admin login
- [ ] Verify booking management
- [ ] Verify driver management
- [ ] Test subscriber list
- [ ] Test data export

## 4. Build & Deploy

### Local Build Test
```bash
# Clear next cache
rm -rf .next

# Fresh install
rm -rf node_modules
npm install

# Build test
npm run build
```

### Quick local production run (smoke test)

After a successful `npm run build`, run the production server locally to smoke-test routes:

```bash
# copy env example
cp .env.example .env.local
# fill env.local with required keys (SUPABASE_SERVICE_KEY needed for admin features)

# start production server
npm run start

# Open http://localhost:3000 and test forms and /api endpoints
```

### Docker (optional)

Build and run using the included `Dockerfile`:

```bash
# build image
docker build -t ridewithnanda:latest .

# run container (set env vars or mount .env)
docker run -p 3000:3000 --env-file .env.local ridewithnanda:latest
```

### Deployment
- [ ] Push changes to GitHub
- [ ] Connect to deployment platform (e.g., Vercel)
- [ ] Set all environment variables in deployment platform
- [ ] Deploy and verify successful build
- [ ] Test all forms in production environment
- [ ] Monitor error logs

## 5. Post-Deployment

- [ ] Test all forms on production
- [ ] Verify data is being saved to Supabase
- [ ] Check admin access works
- [ ] Monitor for any error logs
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

## Common Issues

1. Form Submission Errors
   - Check Supabase connection
   - Verify environment variables
   - Check browser console for errors
   - Verify API routes are responding

2. Database Errors
   - Check RLS policies
   - Verify service role key permissions
   - Check table schemas match expected format

3. Build Errors
   - Clear `.next` cache
   - Fresh `node_modules` install
   - Check for TypeScript errors
   - Verify all environment variables are set