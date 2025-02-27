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

const steps = ['Review Cart', 'Customer Details', 'Schedule Pickup', 'Confirm Order'];

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export default function Checkout() {
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
  
  const { cartItems, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
        return cartItems.length > 0;
      case 1:
        return customerDetails.name && customerDetails.email && customerDetails.phone && customerDetails.address;
      case 2:
        return pickupDate !== null;
      default:
        return true;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!pickupDate) {
        setError('Please select a pickup date');
        return;
      }

      const orderData: Omit<Order, 'id'> = {
        customerId: currentUser?.uid || 'guest',
        customerDetails: {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          notes: customerDetails.notes,
        },
        items: cartItems,
        status: 'pending',
        totalAmount: total,
        pickupDate: pickupDate.toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const orderId = await orderService.createOrder(orderData);
      setOrderId(orderId);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Review Your Cart
            </Typography>
            <Box sx={{ maxHeight: { xs: '50vh', sm: '60vh' }, overflowY: 'auto', pr: 1 }}>
              {cartItems.map((item) => (
                <Paper key={item.productId} sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} sm={3}>
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        style={{ 
                          width: '100%',
                          maxHeight: '80px',
                          objectFit: 'contain'
                        }} 
                      />
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          fontWeight: 500 
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      {item.selectedSize && (
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.selectedSize}
                        </Typography>
                      )}
                      {item.selectedColor && (
                        <Typography variant="body2" color="text.secondary">
                          Color: {item.selectedColor}
                        </Typography>
                      )}
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        R{item.totalPrice.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Total: R{total.toFixed(2)}</Typography>
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={customerDetails.name}
                  onChange={handleCustomerDetailsChange('name')}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={customerDetails.email}
                  onChange={handleCustomerDetailsChange('email')}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={customerDetails.phone}
                  onChange={handleCustomerDetailsChange('phone')}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={customerDetails.address}
                  onChange={handleCustomerDetailsChange('address')}
                  size="small"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  multiline
                  rows={3}
                  value={customerDetails.notes}
                  onChange={handleCustomerDetailsChange('notes')}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ 
            width: '100%',
            '& .MuiTextField-root': { width: '100%' }
          }}>
            <Typography variant="h6" gutterBottom>
              Schedule Pickup
            </Typography>
            <DateTimePicker
              label="Pickup Date and Time"
              value={pickupDate ? dayjs(pickupDate) : null}
              onChange={(newValue) => setPickupDate(newValue ? newValue.toDate() : null)}
              minDateTime={dayjs()}
              sx={{ width: '100%' }}
            />
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography>Customer: {customerDetails.name}</Typography>
            <Typography>Email: {customerDetails.email}</Typography>
            <Typography>Phone: {customerDetails.phone}</Typography>
            <Typography>Address: {customerDetails.address}</Typography>
            <Typography>Pickup Date: {pickupDate?.toLocaleString()}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Amount: R{total.toFixed(2)}
            </Typography>
          </Box>
        );

      default:
        return 'Unknown step';
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
            onClick={() => navigate('/')}
            sx={{ mt: 3 }}
          >
            Back to Home
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
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!validateStep()}
            size={isMobile ? 'small' : 'medium'}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 