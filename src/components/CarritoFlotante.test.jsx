import { render, screen } from '@testing-library/react';
import CarritoFlotante from './CarritoFlotante';
import { CarritoProvider } from '../context/CarritoContext';

test('renderiza el carrito flotante', () => {
  render(
    <CarritoProvider>
      <CarritoFlotante />
    </CarritoProvider>
  );
  // Puedes agregar aquí un expect según el texto que muestre el componente
});