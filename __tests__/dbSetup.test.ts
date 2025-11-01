import { supabaseAdmin } from '@/lib/supabaseAdmin';

describe('Database Setup', () => {
  it('should have subscribers table with correct schema', async () => {
    const { data: subscribersInfo, error: subscribersError } = await supabaseAdmin
      .from('subscribers')
      .select('*')
      .limit(1);
    expect(subscribersError).toBeNull();
  });

  it('should have bookings table with correct schema', async () => {
    const { data: bookingsInfo, error: bookingsError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .limit(1);
    expect(bookingsError).toBeNull();
  });

  it('should have drivers table with correct schema', async () => {
    const { data: driversInfo, error: driversError } = await supabaseAdmin
      .from('drivers')
      .select('*')
      .limit(1);
    expect(driversError).toBeNull();
  });
});