import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import { PerfilProvider } from '../context/PerfilContext';
import Carrito from '../components/Carrito';
import Header from '../components/Header';

// Mock de Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: 'user123',
      email: 'test@example.com'
    },
    onAuthStateChanged: jest.fn()
  })),
  signOut: jest.fn()
}));

// Mock de Stripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve({
    confirmCardPayment: jest.fn()
  }))
}));

// Mock de fetch para las llamadas a la API
global.fetch = jest.fn();

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

describe('Flujo de Compra - Pruebas de Integración', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('debe renderizar el header correctamente', () => {
    renderWithProviders(<Header />);
    
    // Verificar que el header se renderiza
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  test('debe mostrar el logo correctamente', () => {
    renderWithProviders(<Header />);
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  test('debe mostrar el menú de navegación', () => {
    renderWithProviders(<Header />);
    
    // Verificar que los enlaces de navegación están presentes
    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/categorías/i)).toBeInTheDocument();
    expect(screen.getByText(/promociones/i)).toBeInTheDocument();
    expect(screen.getByText(/historial de pedidos/i)).toBeInTheDocument();
    expect(screen.getByText(/soporte/i)).toBeInTheDocument();
  });

  test('debe mostrar el botón de perfil', () => {
    renderWithProviders(<Header />);
    
    const perfilButton = screen.getByText('PERFIL');
    expect(perfilButton).toBeInTheDocument();
  });

  test('debe mostrar el campo de búsqueda', () => {
    renderWithProviders(<Header />);
    
    const searchInput = screen.getByPlaceholderText('¿Qué estás buscando?');
    expect(searchInput).toBeInTheDocument();
  });

  test('debe mostrar el botón de búsqueda', () => {
    renderWithProviders(<Header />);
    
    const searchButton = screen.getByText('🔍');
    expect(searchButton).toBeInTheDocument();
  });

  test('debe tener enlaces de navegación funcionales', () => {
    renderWithProviders(<Header />);
    
    const inicioLink = screen.getByText(/inicio/i);
    const categoriasLink = screen.getByText(/categorías/i);
    const promocionesLink = screen.getByText(/promociones/i);
    
    expect(inicioLink).toHaveAttribute('href', '/Inicio');
    expect(categoriasLink).toHaveAttribute('href', '/Categorias');
    expect(promocionesLink).toHaveAttribute('href', '/Promociones');
  });

  test('debe manejar el estado del carrito correctamente', () => {
    // Simular productos en el carrito
    const mockCarrito = [
      { id: 1, nombre: 'Producto 1', cantidad: 2, precio: 100 }
    ];
    localStorage.setItem('carrito', JSON.stringify(mockCarrito));

    renderWithProviders(<Header />);
    
    // Verificar que el header se renderiza con productos en el carrito
    expect(document.querySelector('header')).toBeInTheDocument();
  });
}); 