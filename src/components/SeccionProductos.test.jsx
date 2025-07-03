import { render, screen } from '@testing-library/react';
import SeccionProductos from './SeccionProductos';
import { CarritoProvider } from '../context/CarritoContext';
import { PerfilProvider } from '../context/PerfilContext';
import { MemoryRouter } from 'react-router-dom';

test('renderiza la sección de productos', () => {
  render(
    <MemoryRouter>
      <PerfilProvider>
        <CarritoProvider>
          <SeccionProductos />
        </CarritoProvider>
      </PerfilProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/productos/i)).toBeInTheDocument();
}); 