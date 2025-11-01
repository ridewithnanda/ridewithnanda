import { render, fireEvent, waitFor } from '@testing-library/react';
import SubscribeForm from '@/components/SubscribeForm';
import BookingForm from '@/components/forms/BookingForm';
import DriverForm from '@/components/forms/DriverForm';

describe('Form Components', () => {
  it('renders SubscribeForm correctly', () => {
    const { getByPlaceholderText, getByRole } = render(<SubscribeForm />);
    expect(getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('Join Now');
  });

  it('validates email in SubscribeForm', async () => {
    const { getByPlaceholderText, getByRole } = render(<SubscribeForm />);
    const input = getByPlaceholderText('Your email');
    const form = getByRole('form');

    // Invalid email
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(getByRole('alert')).toHaveTextContent('Please enter a valid email.');
    });

    // Valid email
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(input).toHaveValue('');
      expect(getByRole('status')).toHaveTextContent('Success');
    });
  });

  it('renders BookingForm correctly', () => {
    const { getByLabelText } = render(<BookingForm />);
    expect(getByLabelText('Full Name*')).toBeInTheDocument();
    expect(getByLabelText('Phone (WhatsApp)*')).toBeInTheDocument();
    expect(getByLabelText('Pickup City*')).toBeInTheDocument();
    expect(getByLabelText('Drop City*')).toBeInTheDocument();
  });

  it('renders DriverForm correctly', () => {
    const { getByLabelText } = render(<DriverForm />);
    expect(getByLabelText('Full Name*')).toBeInTheDocument();
    expect(getByLabelText('Phone (WhatsApp)*')).toBeInTheDocument();
    expect(getByLabelText('City/Operating Region*')).toBeInTheDocument();
    expect(getByLabelText('Car Model')).toBeInTheDocument();
  });
});