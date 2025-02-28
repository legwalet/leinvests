import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your order ID is: {orderId}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          We'll send you a confirmation email with the order details.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          fullWidth
        >
          Return to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation; 