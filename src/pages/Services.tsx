import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import ProductDetailModal from '../components/services/ProductDetailModal';
import { Product } from '../types/services';
import FallbackImage from '../components/common/FallbackImage';
import { validateServices } from '../utils/verifyServices';

const Services = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        validateServices(); // This shouldn't throw errors anymore
        setLoading(false);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('There was an error loading the services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleProductClick = (product: Product) => {
    try {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to open product details');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);
    } catch (err) {
      setError('Failed to load category products');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayPrice = (product: Product) => {
    if (product.basePrice) {
      return `$${product.basePrice.toFixed(2)}`;
    }
    if (product.displayPrice) {
      return product.displayPrice;
    }
    return 'Contact for pricing';
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Our Services
          </Typography>
        </motion.div>

        {!selectedCategory ? (
          // Show service categories
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} md={6} lg={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.2s ease-in-out'
                      }
                    }}
                    onClick={() => handleCategoryClick(service.id)}
                  >
                    <FallbackImage
                      src={`/images/services/${service.id}.jpg`}
                      alt={service.name}
                    />
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Show products for selected category
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mt: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h2">
                  {services.find(s => s.id === selectedCategory)?.name} Products
                </Typography>
                <Button onClick={() => setSelectedCategory(null)}>
                  Back to Services
                </Button>
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {services
                    .find(s => s.id === selectedCategory)
                    ?.products.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card
                          sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              transition: 'transform 0.2s ease-in-out'
                            }
                          }}
                          onClick={() => handleProductClick(product)}
                        >
                          <FallbackImage
                            src={product.imageUrl}
                            alt={product.name}
                          />
                          <CardContent>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                              {getDisplayPrice(product)}
                            </Typography>
                            {product.dimensions && (
                              <Typography variant="body2" color="text.secondary">
                                {product.dimensions}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
          </motion.div>
        )}

        <ProductDetailModal
          product={selectedProduct}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      </Box>
    </Container>
  );
};

export default Services; 