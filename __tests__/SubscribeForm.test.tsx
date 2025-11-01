import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubscribeForm from '../components/SubscribeForm';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ ok: true }),
  })
) as jest.Mock;

describe('SubscribeForm', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders subscribe form', () => {
    render(<SubscribeForm />);
    
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join Now');
  });

  it('validates email format', async () => {
    render(<SubscribeForm />);
    
    const emailInput = screen.getByPlaceholderText('Your email');
    const form = screen.getByRole('form');

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Please enter a valid email.');
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits valid email successfully', async () => {
    render(<SubscribeForm />);
    
    const emailInput = screen.getByPlaceholderText('Your email');
    const form = screen.getByRole('form');

    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });

    await waitFor(() => {
      const successMessage = screen.getByRole('status');
      expect(successMessage).toHaveTextContent('Submitted successfully!');
    });
  });

  it('handles API error', async () => {
    // Mock fetch to return error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'API Error' }),
      })
    );

    render(<SubscribeForm />);
    
    const emailInput = screen.getByPlaceholderText('Your email');
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('API Error');
    });
  });
});