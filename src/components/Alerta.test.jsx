// src/components/Alerta.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Alerta from './Alerta';

test('muestra el mensaje y cierra la alerta', () => {
  const mockClose = jest.fn();
  render(<Alerta mensaje="¡Error!" onClose={mockClose} />);
  expect(screen.getByText('¡Error!')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
  expect(mockClose).toHaveBeenCalled();
});