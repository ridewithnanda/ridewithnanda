import { NextRequest } from 'next/server';
import { POST as subscribeHandler } from '@/app/api/subscribe/route';
import { POST as bookingHandler } from '@/app/api/booking/route';
import { POST as driverHandler } from '@/app/api/driver/route';

describe('API Routes', () => {
  const testEmail = `test${Date.now()}@example.com`;
  const testName = 'Test User';
  const testPhone = '+1234567890';

  it('should handle subscribe POST request', async () => {
    const req = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: testEmail })
    });

    const res = await subscribeHandler(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it('should handle booking POST request', async () => {
    const req = new NextRequest('http://localhost:3000/api/booking', {
      method: 'POST',
      body: JSON.stringify({
        full_name: testName,
        phone: testPhone,
        pickup_city: 'Test City A',
        drop_city: 'Test City B',
        date: '2025-11-01',
        notes: 'Test booking'
      })
    });

    const res = await bookingHandler(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it('should handle driver POST request', async () => {
    const req = new NextRequest('http://localhost:3000/api/driver', {
      method: 'POST',
      body: JSON.stringify({
        full_name: testName,
        phone: testPhone,
        city: 'Test City',
        car_model: 'Test Car',
        years_experience: '5'
      })
    });

    const res = await driverHandler(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.ok).toBe(true);
  });
});