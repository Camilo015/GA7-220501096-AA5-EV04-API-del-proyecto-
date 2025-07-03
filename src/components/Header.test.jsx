import { render, screen } from '@testing-library/react';
import Header from './Header';
import { PerfilProvider } from '../context/PerfilContext';
import { CarritoProvider } from '../context/CarritoContext';
import { MemoryRouter } from 'react-router-dom';

test('renderiza el header', () => {
  render(
    <MemoryRouter>
      <PerfilProvider>
        <CarritoProvider>
          <Header />
        </CarritoProvider>
      </PerfilProvider>
    </MemoryRouter>
  );
  expect(screen.getByRole('banner')).toBeInTheDocument();
});