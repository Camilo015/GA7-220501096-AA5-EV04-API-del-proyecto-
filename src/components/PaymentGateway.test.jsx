import { render, screen } from '@testing-library/react';
import PaymentGateway from './PaymentGateway';
import { MemoryRouter } from 'react-router-dom';

test('renderiza el gateway de pago', () => {
  render(
    <MemoryRouter>
      <PaymentGateway />
    </MemoryRouter>
  );
  expect(screen.getByText(/pago/i)).toBeInTheDocument();
}); 