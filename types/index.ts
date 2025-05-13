// Material types
export interface Material {
  id: string;
  name: string;
  code: string;
  stock: number;
  leadTime: number;
  averageUsage: number;
  location?: string;
  supplier?: string;
  threshold: number;
  unitOfMeasure: string;
  unitPrice: number;
}

// Product types
export interface Product {
  id: string;
  name: string;
  code: string;
  materials: ProductMaterial[];
  leadTime: number;
  procedure?: string;
}

export interface ProductMaterial {
  materialId: string;
  quantity: number;
}

// Order types
export interface Order {
  id: string;
  customerName: string;
  customerCode: string;
  items: OrderItem[];
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  productName: string;
  productCode: string;
}

// Transaction types
export interface Transaction {
  id: string;
  type: 'inbound' | 'outbound';
  materialId: string;
  materialName: string;
  quantity: number;
  timestamp: string;
  orderId?: string;
  notes?: string;
}

// Dashboard types
export interface StockAlert {
  materialId: string;
  materialName: string;
  currentStock: number;
  threshold: number;
  percentRemaining: number;
}

export interface InventorySummary {
  totalItems: number;
  itemsInStock: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
}

export interface OrderSummary {
  pending: number;
  processing: number;
  completed: number;
  total: number;
  lateOrders: number;
}