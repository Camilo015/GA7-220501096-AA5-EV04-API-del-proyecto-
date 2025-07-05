import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PerfilProvider, usePerfil } from './PerfilContext';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { perfilMenuActivo, togglePerfilMenu, cerrarMenu } = usePerfil();
  
  return (
    <div>
      <div data-testid="menu-status">{perfilMenuActivo ? 'abierto' : 'cerrado'}</div>
      <button onClick={togglePerfilMenu} data-testid="toggle-btn">
        Toggle Menu
      </button>
      <button onClick={cerrarMenu} data-testid="cerrar-btn">
        Cerrar Menu
      </button>
    </div>
  );
};

describe('PerfilContext', () => {
  test('debe inicializar con menú cerrado', () => {
    render(
      <PerfilProvider>
        <TestComponent />
      </PerfilProvider>
    );

    expect(screen.getByTestId('menu-status')).toHaveTextContent('cerrado');
  });

  test('debe abrir el menú al hacer toggle', () => {
    render(
      <PerfilProvider>
        <TestComponent />
      </PerfilProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('menu-status')).toHaveTextContent('abierto');
  });

  test('debe cerrar el menú al hacer toggle nuevamente', () => {
    render(
      <PerfilProvider>
        <TestComponent />
      </PerfilProvider>
    );

    // Abrir el menú
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('menu-status')).toHaveTextContent('abierto');

    // Cerrar el menú
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('menu-status')).toHaveTextContent('cerrado');
  });

  test('debe cerrar el menú con la función cerrarMenu', () => {
    render(
      <PerfilProvider>
        <TestComponent />
      </PerfilProvider>
    );

    // Abrir el menú
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('menu-status')).toHaveTextContent('abierto');

    // Cerrar con función específica
    fireEvent.click(screen.getByTestId('cerrar-btn'));
    expect(screen.getByTestId('menu-status')).toHaveTextContent('cerrado');
  });

  test('debe lanzar error si usePerfil se usa fuera del provider', () => {
    // Suprimir el error de console para esta prueba
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('usePerfil debe ser usado dentro de un PerfilProvider');
    
    consoleSpy.mockRestore();
  });
}); 