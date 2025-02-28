export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  minimumStock: number;
  lastOrderDate: string;
  supplier?: string;
  cost?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessAddress: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  imageUrl: string;
  dimensions: string;
  isAvailable: boolean;
}

export interface StockOrder {
  id?: string;
  productId: string;
  productName: string;
  quantity: number;
  supplier: string;
  cost: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderDate: string;
} 