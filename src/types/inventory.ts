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

export interface StockOrder {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  orderDate: string;
  supplier: string;
  status: 'pending' | 'delivered' | 'cancelled';
  cost: number;
} 