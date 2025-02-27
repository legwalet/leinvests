import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, total, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your cart is empty. Start shopping to add items to your cart.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        {cartItems.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Total: R{total.toFixed(2)}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
            sx={{ mr: 2 }}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout')}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart; 