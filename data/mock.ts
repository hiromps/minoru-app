import { Material, Product, Order, Transaction, StockAlert, InventorySummary, OrderSummary } from '@/types';

// Mock Materials
export const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Aluminum Sheet 1mm',
    code: 'AS-001',
    stock: 250,
    leadTime: 7,
    averageUsage: 35,
    location: 'Warehouse A, Shelf 3',
    supplier: 'MetalWorks Inc.',
    threshold: 100,
    unitOfMeasure: 'sheet',
    unitPrice: 25.50
  },
  {
    id: '2',
    name: 'Steel Rod 10mm',
    code: 'SR-010',
    stock: 80,
    leadTime: 14,
    averageUsage: 12,
    location: 'Warehouse B, Shelf 1',
    supplier: 'SteelMasters Ltd.',
    threshold: 30,
    unitOfMeasure: 'rod',
    unitPrice: 18.75
  },
  {
    id: '3',
    name: 'Copper Wire 2mm',
    code: 'CW-002',
    stock: 15,
    leadTime: 10,
    averageUsage: 5,
    location: 'Warehouse A, Shelf 7',
    supplier: 'ElectroWire Co.',
    threshold: 25,
    unitOfMeasure: 'spool',
    unitPrice: 42.00
  },
  {
    id: '4',
    name: 'Plastic Connector Type A',
    code: 'PC-A01',
    stock: 420,
    leadTime: 5,
    averageUsage: 60,
    location: 'Warehouse C, Bin 12',
    supplier: 'PlastiCorp',
    threshold: 200,
    unitOfMeasure: 'piece',
    unitPrice: 0.85
  },
  {
    id: '5',
    name: 'LED Light 5W',
    code: 'LED-5W',
    stock: 50,
    leadTime: 21,
    averageUsage: 30,
    location: 'Warehouse B, Shelf 5',
    supplier: 'BrightTech Electronics',
    threshold: 100,
    unitOfMeasure: 'piece',
    unitPrice: 3.25
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Metal Frame Assembly',
    code: 'MFA-100',
    materials: [
      { materialId: '1', quantity: 2 },
      { materialId: '2', quantity: 4 }
    ],
    leadTime: 3,
    procedure: '1. Cut aluminum sheets\n2. Bend to form\n3. Assemble with steel rods'
  },
  {
    id: '2',
    name: 'Electronic Control Unit',
    code: 'ECU-200',
    materials: [
      { materialId: '3', quantity: 1 },
      { materialId: '4', quantity: 8 },
      { materialId: '5', quantity: 4 }
    ],
    leadTime: 5,
    procedure: '1. Assemble PCB\n2. Connect wiring\n3. Install LEDs\n4. Test functionality'
  },
  {
    id: '3',
    name: 'Complete System',
    code: 'CS-300',
    materials: [
      { materialId: '1', quantity: 2 },
      { materialId: '2', quantity: 4 },
      { materialId: '3', quantity: 1 },
      { materialId: '4', quantity: 10 },
      { materialId: '5', quantity: 6 }
    ],
    leadTime: 7
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'TechSolutions Inc.',
    customerCode: 'TSI-001',
    items: [
      { productId: '1', quantity: 5, productName: 'Metal Frame Assembly', productCode: 'MFA-100' }
    ],
    priority: 'high',
    dueDate: '2025-03-15',
    status: 'processing',
    createdAt: '2025-02-28',
    updatedAt: '2025-03-01'
  },
  {
    id: '2',
    customerName: 'Electronics Partners',
    customerCode: 'EP-002',
    items: [
      { productId: '2', quantity: 10, productName: 'Electronic Control Unit', productCode: 'ECU-200' }
    ],
    priority: 'medium',
    dueDate: '2025-03-20',
    status: 'pending',
    createdAt: '2025-03-02',
    updatedAt: '2025-03-02'
  },
  {
    id: '3',
    customerName: 'Global Systems Ltd.',
    customerCode: 'GSL-003',
    items: [
      { productId: '3', quantity: 2, productName: 'Complete System', productCode: 'CS-300' }
    ],
    priority: 'low',
    dueDate: '2025-04-10',
    status: 'pending',
    createdAt: '2025-03-05',
    updatedAt: '2025-03-05'
  },
  {
    id: '4',
    customerName: 'Industrial Solutions',
    customerCode: 'IS-004',
    items: [
      { productId: '1', quantity: 8, productName: 'Metal Frame Assembly', productCode: 'MFA-100' },
      { productId: '2', quantity: 4, productName: 'Electronic Control Unit', productCode: 'ECU-200' }
    ],
    priority: 'high',
    dueDate: '2025-03-12',
    status: 'processing',
    createdAt: '2025-02-25',
    updatedAt: '2025-02-27'
  },
  {
    id: '5',
    customerName: 'MegaTech Corp',
    customerCode: 'MTC-005',
    items: [
      { productId: '3', quantity: 1, productName: 'Complete System', productCode: 'CS-300' }
    ],
    priority: 'medium',
    dueDate: '2025-03-25',
    status: 'completed',
    createdAt: '2025-02-20',
    updatedAt: '2025-03-03'
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'inbound',
    materialId: '1',
    materialName: 'Aluminum Sheet 1mm',
    quantity: 50,
    timestamp: '2025-02-28T10:23:15',
    notes: 'Regular supply delivery'
  },
  {
    id: '2',
    type: 'outbound',
    materialId: '1',
    materialName: 'Aluminum Sheet 1mm',
    quantity: 10,
    timestamp: '2025-03-01T09:15:45',
    orderId: '1',
    notes: 'Used for order #1'
  },
  {
    id: '3',
    type: 'inbound',
    materialId: '3',
    materialName: 'Copper Wire 2mm',
    quantity: 5,
    timestamp: '2025-03-02T14:30:22',
    notes: 'Emergency order due to low stock'
  },
  {
    id: '4',
    type: 'outbound',
    materialId: '5',
    materialName: 'LED Light 5W',
    quantity: 24,
    timestamp: '2025-03-03T11:45:10',
    orderId: '2',
    notes: 'Used for order #2'
  },
  {
    id: '5',
    type: 'outbound',
    materialId: '4',
    materialName: 'Plastic Connector Type A',
    quantity: 40,
    timestamp: '2025-03-04T16:20:05',
    orderId: '2',
    notes: 'Used for order #2'
  }
];

// Mock Alerts
export const mockStockAlerts: StockAlert[] = [
  {
    materialId: '3',
    materialName: 'Copper Wire 2mm',
    currentStock: 15,
    threshold: 25,
    percentRemaining: 60
  },
  {
    materialId: '5',
    materialName: 'LED Light 5W',
    currentStock: 50,
    threshold: 100,
    percentRemaining: 50
  }
];

// Mock Dashboard Summary Data
export const mockInventorySummary: InventorySummary = {
  totalItems: 5,
  itemsInStock: 5,
  lowStockItems: 2,
  outOfStockItems: 0,
  totalValue: 9382.50
};

export const mockOrderSummary: OrderSummary = {
  pending: 2,
  processing: 2,
  completed: 1,
  total: 5,
  lateOrders: 0
};