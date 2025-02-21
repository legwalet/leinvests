import { ServiceCategory } from '../types/services';

export const services: ServiceCategory[] = [
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    description: 'Professional graphic design services for all your branding needs',
    icon: 'design',
    products: [
      {
        id: 'logo-design',
        name: 'Logo Design',
        description: 'Custom logo design with unlimited revisions',
        imageUrl: '/images/services/logo-design.jpg',
        category: 'graphic-design',
        basePrice: 299,
        customization: {
          hasDesign: true,
          designPrice: 50,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 25,
          hasSizes: false,
          sizes: []
        }
      },
      {
        id: 'branding',
        name: 'Brand Identity Package',
        description: 'Complete brand identity including logo, business cards, and letterhead',
        imageUrl: '/images/services/branding.jpg',
        category: 'graphic-design',
        basePrice: 599,
        customization: {
          hasDesign: true,
          designPrice: 100,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 50,
          hasSizes: false,
          sizes: []
        }
      },
      {
        id: 'social-media',
        name: 'Social Media Design',
        description: 'Eye-catching social media graphics and templates for your brand',
        imageUrl: '/images/services/social-media.jpg',
        category: 'graphic-design',
        displayPrice: 'From $199/month'
      }
    ]
  },
  {
    id: 'banners',
    name: 'Banners',
    description: 'High-quality banner printing for indoor and outdoor use',
    icon: 'banner',
    products: [
      {
        id: 'vinyl-banners',
        name: 'Vinyl Banners',
        description: 'Durable vinyl banners perfect for outdoor events',
        imageUrl: '/images/services/vinyl-banners.jpg',
        category: 'banners',
        basePrice: 8.99,
        customization: {
          hasDesign: true,
          designPrice: 30,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 5,
          hasSizes: true,
          sizes: [
            { id: 'small', name: 'Small', dimensions: '2x4 ft', price: 8.99 },
            { id: 'medium', name: 'Medium', dimensions: '3x6 ft', price: 15.99 },
            { id: 'large', name: 'Large', dimensions: '4x8 ft', price: 24.99 }
          ]
        }
      },
      {
        id: 'mesh-banners',
        name: 'Mesh Banners',
        description: 'Wind-resistant mesh banners ideal for construction sites',
        imageUrl: '/images/services/mesh-banners.jpg',
        category: 'banners',
        displayPrice: 'From $10.99/sqft'
      },
      {
        id: 'pull-up-banners',
        name: 'Pull-up Banners',
        description: 'Portable retractable banners perfect for trade shows and presentations',
        imageUrl: '/images/services/pull-up-banners.jpg',
        category: 'banners',
        displayPrice: 'From $149.00',
        dimensions: '33" x 78"'
      }
    ]
  },
  {
    id: 'lamination',
    name: 'Lamination',
    description: 'Professional lamination services for documents and prints',
    icon: 'lamination',
    products: [
      {
        id: 'gloss-lamination',
        name: 'Gloss Lamination',
        description: 'High-shine finish that enhances colors and provides protection',
        imageUrl: '/images/services/gloss-lamination.jpg',
        category: 'lamination',
        displayPrice: 'From $2.99/sheet',
        dimensions: 'Up to A0 size'
      },
      {
        id: 'matte-lamination',
        name: 'Matte Lamination',
        description: 'Non-reflective finish perfect for professional documents',
        imageUrl: '/images/services/matte-lamination.jpg',
        category: 'lamination',
        displayPrice: 'From $2.99/sheet',
        dimensions: 'Up to A0 size'
      }
    ]
  },
  {
    id: 'digital-printing',
    name: 'Digital Printing',
    description: 'High-quality digital printing services for all your needs',
    icon: 'printing',
    products: [
      {
        id: 'document-printing',
        name: 'Document Printing',
        description: 'Professional document printing in color or black & white',
        imageUrl: '/images/services/document-printing.jpg',
        category: 'digital-printing',
        displayPrice: 'From $0.10/page',
        dimensions: 'A4, A3, A2'
      },
      {
        id: 'photo-printing',
        name: 'Photo Printing',
        description: 'High-resolution photo printing on premium paper',
        imageUrl: '/images/services/photo-printing.jpg',
        category: 'digital-printing',
        price: 'From $0.99/print',
        dimensions: 'Multiple sizes available'
      },
      {
        id: 'large-format',
        name: 'Large Format Printing',
        description: 'Large scale printing for posters and displays',
        imageUrl: '/images/services/large-format.jpg',
        category: 'digital-printing',
        price: 'Custom quote',
        dimensions: 'Up to 60" wide'
      }
    ]
  },
  {
    id: 'posters',
    name: 'Posters',
    description: 'Eye-catching poster printing for any occasion',
    icon: 'poster',
    products: [
      {
        id: 'standard-posters',
        name: 'Standard Posters',
        description: 'High-quality posters on premium paper',
        imageUrl: '/images/services/standard-posters.jpg',
        category: 'posters',
        price: 'From $19.99',
        dimensions: 'A3, A2, A1, A0'
      },
      {
        id: 'photo-posters',
        name: 'Photo Posters',
        description: 'Professional photo enlargements on photo paper',
        imageUrl: '/images/services/photo-posters.jpg',
        category: 'posters',
        price: 'From $24.99',
        dimensions: 'Multiple sizes available'
      }
    ]
  },
  {
    id: 'flyers',
    name: 'Flyers',
    description: 'Eye-catching flyer printing for effective marketing',
    icon: 'flyer',
    products: [
      {
        id: 'standard-flyers',
        name: 'Standard Flyers',
        description: 'High-quality flyers on premium paper',
        imageUrl: '/images/services/flyers.jpg',
        category: 'flyers',
        basePrice: 29.99,
        customization: {
          hasDesign: true,
          designPrice: 20,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 5,
          hasSizes: true,
          sizes: [
            { id: 'a6', name: 'A6', dimensions: '105x148mm', price: 29.99 },
            { id: 'a5', name: 'A5', dimensions: '148x210mm', price: 39.99 },
            { id: 'a4', name: 'A4', dimensions: '210x297mm', price: 49.99 }
          ]
        }
      },
      {
        id: 'premium-flyers',
        name: 'Premium Flyers',
        description: 'Luxury flyers with special finishes',
        imageUrl: '/images/services/premium-flyers.jpg',
        category: 'flyers',
        price: 'From $79.99/500',
        dimensions: 'A6, A5, A4'
      }
    ]
  },
  {
    id: 'flags',
    name: 'Flags',
    description: 'Custom flag printing for outdoor advertising',
    icon: 'flag',
    products: [
      {
        id: 'feather-flags',
        name: 'Feather Flags',
        description: 'Tall, eye-catching flags perfect for events',
        imageUrl: '/images/services/feather-flags.jpg',
        category: 'flags',
        price: 'From $129',
        dimensions: '2.5m, 3.5m, 4.5m'
      },
      {
        id: 'teardrop-flags',
        name: 'Teardrop Flags',
        description: 'Distinctive teardrop-shaped flags',
        imageUrl: '/images/services/teardrop-flags.jpg',
        category: 'flags',
        price: 'From $139',
        dimensions: '2.5m, 3.5m, 4.5m'
      }
    ]
  },
  {
    id: 'business-cards',
    name: 'Business Cards',
    description: 'Professional business card printing services',
    icon: 'card',
    products: [
      {
        id: 'standard-cards',
        name: 'Standard Business Cards',
        description: 'Premium quality business cards on 350gsm card stock',
        imageUrl: '/images/services/business-cards.jpg',
        category: 'business-cards',
        basePrice: 49.99,
        customization: {
          hasDesign: true,
          designPrice: 25,
          hasColor: true,
          colorOptions: ['Full Color', 'Black & White'],
          colorPrice: 10,
          hasSizes: false,
          sizes: []
        }
      },
      {
        id: 'premium-cards',
        name: 'Premium Business Cards',
        description: 'Luxury cards with special finishes (Spot UV, Gold Foil, etc.)',
        imageUrl: '/images/services/premium-cards.jpg',
        category: 'business-cards',
        price: 'From $79.99/500',
        dimensions: '90x55mm'
      },
      {
        id: 'square-cards',
        name: 'Square Business Cards',
        description: 'Unique square-format business cards',
        imageUrl: '/images/services/square-cards.jpg',
        category: 'business-cards',
        price: 'From $59.99/500',
        dimensions: '55x55mm'
      }
    ]
  }
]; 