import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Divider,
  TextField,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { CartItem as CartItemType } from '../../types/services';
import { useCart } from '../../contexts/CartContext';
import FallbackImage from '../common/FallbackImage';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      updateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <Paper sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
        <Grid item xs={4} sm={3}>
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            style={{ 
              width: '100%', 
              maxHeight: { xs: '80px', sm: '120px' },
              objectFit: 'contain' 
            }} 
          />
        </Grid>
        <Grid item xs={8} sm={9}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.25rem' },
                mb: { xs: 1, sm: 0 }
              }}
            >
              {item.name}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mt: { xs: 1, sm: 0 }
            }}>
              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                R{item.totalPrice.toFixed(2)}
              </Typography>
              <IconButton size="small" onClick={() => removeFromCart(item.productId)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            {/* Size Selection */}
            {item.selectedSize && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={item.selectedSize.id}
                    label="Size"
                    disabled
                  >
                    <MenuItem value={item.selectedSize.id}>
                      {item.selectedSize.name} ({item.selectedSize.dimensions})
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Color Selection */}
            {item.selectedColor && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={item.selectedColor}
                    label="Color"
                    disabled
                  >
                    <MenuItem value={item.selectedColor}>
                      {item.selectedColor}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Design Option */}
            {item.hasDesign && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Custom Design Included (+R{item.designPrice?.toFixed(2)})
                </Typography>
              </Grid>
            )}

            {/* Quantity */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Unit Price: R{(item.totalPrice / item.quantity).toFixed(2)}
                </Typography>
                <Typography variant="h6" color="primary">
                  Total: R{item.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem; 