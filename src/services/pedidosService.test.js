import { 
  getPedidosUsuario, 
  crearPedido, 
  getTodosLosPedidos, 
  actualizarEstadoPedido, 
  cancelarPedido 
} from './pedidosService';

// Mock de Firebase
jest.mock('../firebase/config', () => ({
  db: {}
}));

// Mock de firebase/firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  Timestamp: {
    fromDate: jest.fn((date) => ({ toDate: () => date }))
  },
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn()
}));

// Mock de firebase/auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn()
}));

describe('pedidosService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPedidosUsuario', () => {
    test('debe obtener pedidos de un usuario correctamente', async () => {
      const mockQuerySnapshot = {
        forEach: jest.fn((callback) => {
          callback({
            id: 'pedido1',
            data: () => ({
              usuarioId: 'user123',
              items: [{ id: 1, nombre: 'Producto Test', cantidad: 2, precio: 100 }],
              total: 200,
              estado: 'pendiente',
              fechaCreacion: { toDate: () => new Date() }
            })
          });
        })
      };

      const { getDocs, collection, query, where, orderBy } = require('firebase/firestore');
      getDocs.mockResolvedValue(mockQuerySnapshot);
      collection.mockReturnValue({});
      query.mockReturnValue({});
      where.mockReturnValue({});
      orderBy.mockReturnValue({});

      const resultado = await getPedidosUsuario('user123');

      expect(resultado).toHaveLength(1);
      expect(resultado[0].id).toBe('pedido1');
      expect(resultado[0].usuarioId).toBe('user123');
    });

    test('debe lanzar error si no se proporciona usuarioId', async () => {
      await expect(getPedidosUsuario()).rejects.toThrow('ID de usuario no proporcionado');
    });
  });

  describe('crearPedido', () => {
    test('debe crear un pedido correctamente', async () => {
      const mockPedidoData = {
        usuarioId: 'user123',
        items: [{ id: 1, nombre: 'Producto Test', cantidad: 1, precio: 100 }],
        total: 100,
        estado: 'pendiente'
      };

      const mockDocRef = { id: 'nuevoPedido123' };
      const { addDoc, collection } = require('firebase/firestore');
      addDoc.mockResolvedValue(mockDocRef);
      collection.mockReturnValue({});

      const resultado = await crearPedido(mockPedidoData);

      expect(resultado.id).toBe('nuevoPedido123');
      expect(addDoc).toHaveBeenCalled();
    });

    test('debe lanzar error si no se proporciona usuarioId', async () => {
      const mockPedidoData = {
        items: [{ id: 1, nombre: 'Producto Test', cantidad: 1, precio: 100 }],
        total: 100
      };

      await expect(crearPedido(mockPedidoData)).rejects.toThrow('ID de usuario no proporcionado');
    });
  });

  describe('actualizarEstadoPedido', () => {
    test('debe actualizar el estado de un pedido correctamente', async () => {
      const { updateDoc, doc } = require('firebase/firestore');
      updateDoc.mockResolvedValue();
      doc.mockReturnValue({});

      const resultado = await actualizarEstadoPedido('pedido123', 'enviado');

      expect(resultado).toBe(true);
      expect(updateDoc).toHaveBeenCalled();
    });
  });

  describe('cancelarPedido', () => {
    test('debe cancelar un pedido correctamente', async () => {
      const { deleteDoc, doc } = require('firebase/firestore');
      deleteDoc.mockResolvedValue();
      doc.mockReturnValue({});

      const resultado = await cancelarPedido('pedido123');

      expect(resultado).toBe(true);
      expect(deleteDoc).toHaveBeenCalled();
    });
  });
}); 