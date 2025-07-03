// Carrito.test.jsx
import { render, screen } from '@testing-library/react';
import Carrito from './Carrito';
import { CarritoProvider } from '../context/CarritoContext';

test('renderiza el componente Carrito', () => {
  render(
    <CarritoProvider>
      <Carrito />
    </CarritoProvider>
  );
  // Puedes ajustar el texto según lo que muestre el componente cuando el carrito está visible
});