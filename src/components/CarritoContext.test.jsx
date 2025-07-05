import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from '../context/CarritoContext';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, calcularTotal } = useCarrito();
  
  return (
    <div>
      <div data-testid="carrito-count">{carrito.length}</div>
      <div data-testid="carrito-total">{calcularTotal()}</div>
      <button 
        onClick={() => agregarAlCarrito({ id: 1, nombre: 'Producto Test', precio: 100 })}
        data-testid="agregar-btn"
      >
        Agregar Producto
      </button>
      <button 
        onClick={() => eliminarDelCarrito(1)}
        data-testid="eliminar-btn"
      >
        Eliminar Producto
      </button>
    </div>
  );
};

describe('CarritoContext', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  test('debe inicializar con carrito vacío', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    expect(screen.getByTestId('carrito-count')).toHaveTextContent('0');
    expect(screen.getByTestId('carrito-total')).toHaveTextContent('0');
  });

  test('debe agregar un producto al carrito', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    act(() => {
      screen.getByTestId('agregar-btn').click();
    });

    expect(screen.getByTestId('carrito-count')).toHaveTextContent('1');
    expect(screen.getByTestId('carrito-total')).toHaveTextContent('100');
  });

  test('debe eliminar un producto del carrito', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    // Agregar producto primero
    act(() => {
      screen.getByTestId('agregar-btn').click();
    });

    // Luego eliminarlo
    act(() => {
      screen.getByTestId('eliminar-btn').click();
    });

    expect(screen.getByTestId('carrito-count')).toHaveTextContent('0');
    expect(screen.getByTestId('carrito-total')).toHaveTextContent('0');
  });

  test('debe incrementar cantidad si el producto ya existe', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    // Agregar el mismo producto dos veces
    act(() => {
      screen.getByTestId('agregar-btn').click();
      screen.getByTestId('agregar-btn').click();
    });

    expect(screen.getByTestId('carrito-count')).toHaveTextContent('1');
    expect(screen.getByTestId('carrito-total')).toHaveTextContent('200');
  });
}); 