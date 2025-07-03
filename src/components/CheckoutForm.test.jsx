import { render, screen } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MemoryRouter } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_12345');

test('renderiza el formulario de checkout', () => {
  render(
    <MemoryRouter>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </MemoryRouter>
  );
  // expect(screen.getByText(/checkout/i)).toBeInTheDocument();
}); 