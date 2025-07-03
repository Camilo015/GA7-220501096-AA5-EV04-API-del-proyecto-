import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtecteRoute from './ProtecteRoute';

test('renderiza el componente ProtecteRoute', () => {
  render(
    <MemoryRouter>
      <ProtecteRoute />
    </MemoryRouter>
  );
});