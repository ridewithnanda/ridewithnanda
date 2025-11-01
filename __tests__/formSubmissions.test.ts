import { jest } from '@jest/globals';
import supabaseAdmin from '@/lib/supabaseAdmin';

describe('Form Submissions', () => {
  // Test data
  const testEmail = `test${Date.now()}@example.com`;
  const testName = 'Test User';
  const testPhone = '+1234567890';

  it('should submit to subscribers table', async () => {
    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .insert([{ email: testEmail }])
      .select();
    
    expect(error).toBeNull();
    expect(data?.[0].email).toBe(testEmail);
  });

  it('should submit to bookings table', async () => {
    const booking = {
      full_name: testName,
      phone: testPhone,
      pickup_city: 'Test City A',
      drop_city: 'Test City B',
      date: '2025-11-01',
      notes: 'Test booking',
      status: 'pending'
    };

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([booking])
      .select();
    
    expect(error).toBeNull();
    expect(data?.[0].full_name).toBe(testName);
  });

  it('should submit to drivers table', async () => {
    const driver = {
      full_name: testName,
      phone: testPhone,
      city: 'Test City',
      car_model: 'Test Car',
      years_experience: '5',
      status: 'pending'
    };

    const { data, error } = await supabaseAdmin
      .from('drivers')
      .insert([driver])
      .select();
    
    expect(error).toBeNull();
    expect(data?.[0].full_name).toBe(testName);
  });

  // Cleanup
  afterAll(async () => {
    // Clean up test data
    await supabaseAdmin.from('subscribers').delete().eq('email', testEmail);
    await supabaseAdmin.from('bookings').delete().eq('full_name', testName);
    await supabaseAdmin.from('drivers').delete().eq('full_name', testName);
  });
});