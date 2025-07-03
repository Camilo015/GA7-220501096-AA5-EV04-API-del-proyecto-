import { render, screen } from '@testing-library/react';
import AdminForm from './AdminForm';

test('renderiza el formulario de administrador', () => {
  render(<AdminForm />);
  expect(screen.getByText(/agregar nuevo producto/i)).toBeInTheDocument();
});