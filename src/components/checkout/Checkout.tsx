import { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  Container,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Order } from '../../types/services';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { orderService } from '../../services/orderService';
import { useMediaQuery } from '@mui/material';

const steps = ['Shipping Information', 'Review Order', 'Complete'];

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleNext = async () => {
    if (activeStep === 1) {
      try {
        const orderData: Omit<Order, 'id'> = {
          customerId: currentUser?.uid || 'guest',
          customerDetails,
          items: cartItems,
          status: 'pending',
          totalAmount: total,
          pickupDate: pickupDate?.toISOString() || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const orderId = await orderService.createOrder(orderData);
        setOrderId(orderId);
        setOrderSuccess(true);
        clearCart();
        setActiveStep(activeStep + 1);
      } catch (err) {
        console.error('Error creating order:', err);
        setError('Failed to create order. Please try again.');
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleComplete = () => {
    navigate('/');
  };

  const handleCustomerDetailsChange = (field: keyof CustomerDetails) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return customerDetails.name && customerDetails.email && customerDetails.phone && customerDetails.address;
      case 1:
        return pickupDate !== null;
      default:
        return true;
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                value={customerDetails.name}
                onChange={handleCustomerDetailsChange('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={customerDetails.email}
                onChange={handleCustomerDetailsChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone"
                value={customerDetails.phone}
                onChange={handleCustomerDetailsChange('phone')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={customerDetails.address}
                onChange={handleCustomerDetailsChange('address')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={customerDetails.notes}
                onChange={handleCustomerDetailsChange('notes')}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            {cartItems.map((item) => (
              <Box key={item.productId} sx={{ mb: 2 }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  R{item.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: R{total.toFixed(2)}
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography>
              We'll contact you soon about your order.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  if (orderSuccess) {
    return (
      <Dialog 
        open={orderSuccess}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { 
            p: { xs: 2, sm: 4 },
            m: { xs: 2, sm: 'auto' }
          }
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Order Placed Successfully!
          </Typography>
          <Typography>
            Your order ID is: {orderId}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We'll send you a confirmation email with the order details.
          </Typography>
          <Button
            variant="contained"
            onClick={handleComplete}
            sx={{ mt: 3 }}
          >
            Return Home
          </Button>
        </Box>
      </Dialog>
    );
  }

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 2, sm: 3 },
      px: { xs: 1, sm: 2 },
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper sx={{ 
        p: { xs: 2, sm: 3 },
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Stepper 
          activeStep={activeStep}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{ 
            mb: { xs: 2, sm: 4 },
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }} 
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ 
          flexGrow: 1,
          overflowY: 'auto',
          mb: { xs: 2, sm: 3 }
        }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          mt: 'auto',
          pt: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          {activeStep !== 0 && (
            <Button 
              onClick={handleBack}
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
            >
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleComplete}
              size={isMobile ? 'small' : 'medium'}
            >
              Return Home
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!validateStep()}
              size={isMobile ? 'small' : 'medium'}
            >
              {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 