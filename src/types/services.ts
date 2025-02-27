export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface ProductSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
}

export interface ProductCustomization {
  hasDesign: boolean;
  designPrice: number;
  hasColor: boolean;
  colorOptions: string[];
  colorPrice: number;
  hasSizes: boolean;
  sizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  basePrice?: number;
  displayPrice?: string;
  price?: string;
  dimensions?: string;
  customization?: ProductCustomization;
  options?: ProductOption[];
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  products: Product[];
}

export interface Order {
  id?: string;
  customerId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes?: string;
  };
  items: CartItem[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  pickupDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: Date;
  createdAt: Date;
}

export interface CostBreakdown {
  orderId: string;
  materials: number;
  labor: number;
  overhead: number;
  profit: number;
  total: number;
} 