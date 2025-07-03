import { render, screen } from '@testing-library/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MemoryRouter } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';

// Puedes usar una clave de prueba o un mock
const stripePromise = loadStripe('pk_test_12345');

test('renderiza el mensaje de pago exitoso', () => {
  render(
    <MemoryRouter>
      <Elements stripe={stripePromise}>
        <PaymentSuccess />
      </Elements>
    </MemoryRouter>
  );
  // Aquí tu expect, por ejemplo:
  // expect(screen.getByText(/pago exitoso/i)).toBeInTheDocument();
});