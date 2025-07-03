import { render, screen } from '@testing-library/react';
import Modal from './Modal';

test('no renderiza el modal si isOpen es false', () => {
  render(<Modal isOpen={false} />);
  expect(screen.queryByText(/confirmar/i)).not.toBeInTheDocument();
}); 