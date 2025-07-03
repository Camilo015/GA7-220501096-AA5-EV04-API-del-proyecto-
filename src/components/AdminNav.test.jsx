import { render, screen } from '@testing-library/react';
import AdminNav from './AdminNav';
import { MemoryRouter } from 'react-router-dom';

test('renderiza la navegación de administrador', () => {
  render(
    <MemoryRouter>
      <AdminNav />
    </MemoryRouter>
  );
  expect(screen.getByRole('navigation')).toBeInTheDocument();
}); 