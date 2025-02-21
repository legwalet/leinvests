import { services } from '../data/services';
import { ServiceCategory, Product } from '../types/services';

function verifyProduct(product: Product): string[] {
  const errors: string[] = [];

  // Required fields
  if (!product.id) errors.push(`Product missing ID`);
  if (!product.name) errors.push(`Product ${product.id} missing name`);
  if (!product.description) errors.push(`Product ${product.id} missing description`);
  if (!product.imageUrl) errors.push(`Product ${product.id} missing imageUrl`);
  if (!product.category) errors.push(`Product ${product.id} missing category`);

  // Price validation - either basePrice, displayPrice, or price is required
  if (!product.basePrice && !product.displayPrice && !(product as any).price) {
    errors.push(`Product ${product.id} missing price information`);
  }

  // Only validate customization if it exists
  if (product.customization) {
    const { hasDesign, hasColor, hasSizes } = product.customization;
    
    if (hasDesign && typeof product.customization.designPrice !== 'number') {
      errors.push(`Product ${product.id} has design but invalid designPrice`);
    }
    
    if (hasColor && (!Array.isArray(product.customization.colorOptions) || typeof product.customization.colorPrice !== 'number')) {
      errors.push(`Product ${product.id} has color but invalid color options or price`);
    }
    
    if (hasSizes && (!Array.isArray(product.customization.sizes) || product.customization.sizes.length === 0)) {
      errors.push(`Product ${product.id} has sizes but no size options`);
    }
  }

  return errors;
}

function verifyServices(): string[] {
  const errors: string[] = [];

  services.forEach((category: ServiceCategory) => {
    // Verify category
    if (!category.id) errors.push('Category missing ID');
    if (!category.name) errors.push(`Category ${category.id} missing name`);
    if (!category.description) errors.push(`Category ${category.id} missing description`);
    if (!category.icon) errors.push(`Category ${category.id} missing icon`);
    if (!category.products || category.products.length === 0) {
      errors.push(`Category ${category.id} has no products`);
    }

    // Verify each product
    category.products.forEach((product: Product) => {
      const productErrors = verifyProduct(product);
      errors.push(...productErrors);
    });
  });

  return errors;
}

export function validateServices(): void {
  try {
    const errors = verifyServices();
    if (errors.length > 0) {
      console.warn('Service validation warnings:', errors);
      // Don't throw error, just log warnings
    }
  } catch (error) {
    console.error('Service validation error:', error);
    // Don't throw error, just log it
  }
} 