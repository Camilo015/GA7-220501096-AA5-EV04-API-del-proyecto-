import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import { PerfilProvider } from '../context/PerfilContext';
import Header from './Header';

// Mock de Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    onAuthStateChanged: jest.fn()
  })),
  signOut: jest.fn()
}));

// Mock de Firebase config
jest.mock('../firebase/config', () => ({
  db: {},
  auth: {}
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CarritoProvider>
        <PerfilProvider>
          {component}
        </PerfilProvider>
      </CarritoProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('debe renderizar el header correctamente', () => {
    renderWithProviders(<Header />);
    
    // Verificar que el componente se renderiza sin errores
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  test('debe contener elementos de navegación', () => {
    renderWithProviders(<Header />);
    
    // Verificar que existe un elemento de navegación
    expect(document.querySelector('nav')).toBeInTheDocument();
  });

  test('debe manejar el carrito vacío', () => {
    renderWithProviders(<Header />);
    
    // Verificar que el header se renderiza con carrito vacío
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  test('debe manejar productos en el carrito', () => {
    // Simular productos en el carrito
    const mockCarrito = [
      { id: 1, nombre: 'Producto 1', cantidad: 2, precio: 100 }
    ];
    localStorage.setItem('carrito', JSON.stringify(mockCarrito));

    renderWithProviders(<Header />);
    
    // Verificar que el header se renderiza con productos
    expect(document.querySelector('header')).toBeInTheDocument();
  });
});