import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { StockItem, Client, StockOrder, Product } from '../types/inventory';

export const inventoryService = {
  // Stock Management
  async addStockItem(item: Omit<StockItem, 'id'>) {
    const docRef = await addDoc(collection(db, 'stock'), item);
    return { id: docRef.id, ...item };
  },

  async getStockItems() {
    const snapshot = await getDocs(collection(db, 'stock'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StockItem));
  },

  async updateStockQuantity(id: string, quantity: number) {
    await updateDoc(doc(db, 'stock', id), { quantity });
  },

  // Stock Orders
  async createStockOrder(order: Omit<StockOrder, 'id'>) {
    const docRef = await addDoc(collection(db, 'stockOrders'), {
      ...order,
      orderDate: new Date().toISOString()
    });
    return { id: docRef.id, ...order };
  },

  async getStockOrders() {
    const snapshot = await getDocs(collection(db, 'stockOrders'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StockOrder));
  },

  // Client Management
  async addClient(client: Omit<Client, 'id'>) {
    const docRef = await addDoc(collection(db, 'clients'), client);
    return { id: docRef.id, ...client };
  },

  async getClients() {
    const snapshot = await getDocs(collection(db, 'clients'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  },

  async updateClient(id: string, data: Partial<Client>) {
    await updateDoc(doc(db, 'clients', id), data);
  },

  async deleteClient(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  },

  async checkStockAvailability(productId: string): Promise<boolean> {
    // Get all stock items that start with the product ID
    const q = query(
      collection(db, 'stock'),
      where('productId', '>=', productId),
      where('productId', '<=', productId + '\uf8ff')
    );
    
    const stockDocs = await getDocs(q);
    
    // Check if any variation of the product is in stock
    return stockDocs.docs.some(doc => {
      const stockData = doc.data() as StockItem;
      return stockData.quantity > 0;
    });
  },

  async updateProductAvailability(productId: string, isAvailable: boolean) {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, { isAvailable });
  },

  async addExampleData() {
    // Add example clients
    const exampleClients = [
      {
        name: 'John Doe Printing',
        email: 'john@doeprinting.com',
        phone: '+27 123 456 789',
        businessAddress: '123 Print Street, Johannesburg',
        notes: 'Regular customer - bulk orders'
      },
      {
        name: 'Sarah Design Studio',
        email: 'sarah@designstudio.co.za',
        phone: '+27 987 654 321',
        businessAddress: '456 Design Ave, Cape Town',
        notes: 'Prefers premium materials'
      }
    ];

    for (const client of exampleClients) {
      await this.addClient(client);
    }

    // Add example stock items
    const exampleStock = [
      {
        productId: 'vinyl-banners',
        productName: 'Vinyl Banners',
        quantity: 50,
        minimumStock: 10,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Banner Supplies Ltd'
      },
      {
        productId: 'business-cards',
        productName: 'Premium Business Cards',
        quantity: 1000,
        minimumStock: 200,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Paper Co'
      }
    ];

    for (const stock of exampleStock) {
      await this.addStockItem(stock);
    }
  },

  async initializeStockData() {
    const stockItems = [
      {
        productId: 'vinyl-banners',
        productName: 'Vinyl Banners',
        quantity: 50,
        minimumStock: 10,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Banner Supplies Ltd',
        cost: 150.00
      },
      {
        productId: 'business-cards',
        productName: 'Premium Business Cards',
        quantity: 1000,
        minimumStock: 200,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Paper Co',
        cost: 45.00
      },
      {
        productId: 'logo-design',
        productName: 'Logo Design Service',
        quantity: 5,
        minimumStock: 2,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Design Templates Inc',
        cost: 299.00
      },
      {
        productId: 'pull-up-banners',
        productName: 'Pull-up Banners',
        quantity: 15,
        minimumStock: 5,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Display Solutions',
        cost: 180.00
      },
      {
        productId: 'gloss-lamination',
        productName: 'Gloss Lamination Sheets',
        quantity: 500,
        minimumStock: 100,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Lamination Experts',
        cost: 2.50
      },
      {
        productId: 'standard-posters',
        productName: 'Standard Posters',
        quantity: 200,
        minimumStock: 50,
        lastOrderDate: new Date().toISOString(),
        supplier: 'Print Materials Co',
        cost: 15.00
      }
    ];

    // Clear existing stock
    const stockSnapshot = await getDocs(collection(db, 'stock'));
    const deletePromises = stockSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Add new stock items
    const addPromises = stockItems.map(item => this.addStockItem(item));
    await Promise.all(addPromises);

    // Add example products
    const exampleProducts = [
      {
        id: 'vinyl-banners',
        name: 'Vinyl Banners',
        description: 'High-quality vinyl banners for outdoor use',
        category: 'banners',
        basePrice: 150.00,
        imageUrl: '/images/services/vinyl-banners.jpg',
        dimensions: '2x4 ft',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 50,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 25,
          hasSizes: true,
          sizes: [
            { id: 'small', name: 'Small', dimensions: '2x4 ft', price: 150.00 },
            { id: 'medium', name: 'Medium', dimensions: '3x6 ft', price: 250.00 },
            { id: 'large', name: 'Large', dimensions: '4x8 ft', price: 350.00 }
          ]
        }
      },
      {
        id: 'business-cards',
        name: 'Premium Business Cards',
        description: 'High-quality business cards with premium finishes',
        category: 'business-cards',
        basePrice: 45.00,
        imageUrl: '/images/services/business-cards.jpg',
        dimensions: '90x55mm',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 30,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White', 'Spot UV'],
          colorPrice: 15,
          hasSizes: false
        }
      },
      {
        id: 'pull-up-banners',
        name: 'Pull-up Banners',
        description: 'Professional pull-up banners with aluminum stand',
        category: 'banners',
        basePrice: 180.00,
        imageUrl: '/images/services/pull-up-banners.jpg',
        dimensions: '850x2000mm',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 60,
          hasColor: true,
          colorOptions: ['Full Color'],
          colorPrice: 0,
          hasSizes: false
        }
      },
      {
        id: 'flyers',
        name: 'Marketing Flyers',
        description: 'High-quality flyers for marketing and promotions',
        category: 'print',
        basePrice: 25.00,
        imageUrl: '/images/services/flyers.jpg',
        dimensions: 'A5',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 20,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 10,
          hasSizes: true,
          sizes: [
            { id: 'a6', name: 'A6', dimensions: 'A6', price: 20.00 },
            { id: 'a5', name: 'A5', dimensions: 'A5', price: 25.00 },
            { id: 'a4', name: 'A4', dimensions: 'A4', price: 35.00 }
          ]
        }
      },
      {
        id: 'posters',
        name: 'Posters',
        description: 'High-resolution poster printing on premium paper',
        category: 'print',
        basePrice: 35.00,
        imageUrl: '/images/services/posters.jpg',
        dimensions: 'A2',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 40,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 15,
          hasSizes: true,
          sizes: [
            { id: 'a3', name: 'A3', dimensions: 'A3', price: 30.00 },
            { id: 'a2', name: 'A2', dimensions: 'A2', price: 35.00 },
            { id: 'a1', name: 'A1', dimensions: 'A1', price: 45.00 }
          ]
        }
      },
      {
        id: 'vehicle-wraps',
        name: 'Vehicle Wraps',
        description: 'Professional vehicle wrapping services',
        category: 'signage',
        basePrice: 2500.00,
        imageUrl: '/images/services/vehicle-wraps.jpg',
        dimensions: 'Custom',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 200,
          hasColor: true,
          colorOptions: ['Full Color', 'Matte', 'Gloss'],
          colorPrice: 100,
          hasSizes: true,
          sizes: [
            { id: 'partial', name: 'Partial Wrap', dimensions: 'Custom', price: 2500.00 },
            { id: 'full', name: 'Full Wrap', dimensions: 'Custom', price: 4500.00 }
          ]
        }
      },
      {
        id: 'stickers',
        name: 'Custom Stickers',
        description: 'High-quality vinyl stickers with custom shapes',
        category: 'print',
        basePrice: 15.00,
        imageUrl: '/images/services/stickers.jpg',
        dimensions: '50x50mm',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 25,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 10,
          hasSizes: true,
          sizes: [
            { id: 'small', name: 'Small', dimensions: '50x50mm', price: 15.00 },
            { id: 'medium', name: 'Medium', dimensions: '100x100mm', price: 25.00 },
            { id: 'large', name: 'Large', dimensions: '200x200mm', price: 40.00 }
          ]
        }
      },
      {
        id: 'brochures',
        name: 'Brochures',
        description: 'Professional brochures with various fold options',
        category: 'print',
        basePrice: 55.00,
        imageUrl: '/images/services/brochures.jpg',
        dimensions: 'A4',
        isAvailable: true,
        customization: {
          hasDesign: true,
          designPrice: 45,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 20,
          hasSizes: true,
          sizes: [
            { id: 'bifold', name: 'Bi-fold', dimensions: 'A4', price: 55.00 },
            { id: 'trifold', name: 'Tri-fold', dimensions: 'A4', price: 65.00 },
            { id: 'z-fold', name: 'Z-fold', dimensions: 'A4', price: 70.00 }
          ]
        }
      }
    ];

    // Clear existing products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    await Promise.all(productsSnapshot.docs.map(doc => deleteDoc(doc.ref)));

    // Add new products
    await Promise.all(exampleProducts.map(product => this.addProduct(product)));

    return stockItems;
  },

  async updateStock(id: string, data: Partial<StockItem>) {
    await updateDoc(doc(db, 'stock', id), data);
  },

  async processStockOrder(order: StockOrder) {
    // Get current stock
    const stockRef = doc(db, 'stock', order.productId);
    const stockDoc = await getDoc(stockRef);
    
    if (!stockDoc.exists()) {
      throw new Error('Stock item not found');
    }

    const currentStock = stockDoc.data() as StockItem;
    const newQuantity = currentStock.quantity + order.quantity;

    // Update stock quantity
    await this.updateStock(stockDoc.id, {
      quantity: newQuantity,
      lastOrderDate: new Date().toISOString()
    });

    // Create order record
    await this.createStockOrder(order);

    return newQuantity;
  },

  async getProducts() {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  },

  async addProduct(product: Omit<Product, 'id'>) {
    const docRef = await addDoc(collection(db, 'products'), product);
    return { id: docRef.id, ...product };
  },

  async updateProduct(id: string, data: Partial<Product>) {
    await updateDoc(doc(db, 'products', id), data);
  },

  async deleteProduct(id: string) {
    await deleteDoc(doc(db, 'products', id));
  },

  // Add a method to get specific stock level
  async getProductStock(productId: string): Promise<number> {
    const stockRef = doc(db, 'stock', productId);
    const stockDoc = await getDoc(stockRef);
    
    if (!stockDoc.exists()) return 0;
    return (stockDoc.data() as StockItem).quantity;
  },
}; 