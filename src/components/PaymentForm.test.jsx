import { render, screen } from '@testing-library/react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_12345');

test('renderiza el formulario de pago', () => {
  render(
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
  // expect(screen.getByText(/pago/i)).toBeInTheDocument();
}); 