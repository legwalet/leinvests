import {
  Box,
  Button,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { cartItems, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewCart = () => {
    handleClose();
    navigate('/cart');
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={cartItems.length} color="error">
          <CartIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: '320px', maxHeight: '500px' }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cart ({cartItems.length} items)
          </Typography>

          {cartItems.length === 0 ? (
            <Typography color="text.secondary">
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
                {cartItems.map((item) => (
                  <Box key={item.productId}>
                    <ListItem
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.quantity} × R{(item.totalPrice / item.quantity).toFixed(2)}
                        </Typography>
                        {item.selectedSize && (
                          <Typography variant="body2" color="text.secondary">
                            Size: {item.selectedSize.name}
                          </Typography>
                        )}
                        {item.selectedColor && (
                          <Typography variant="body2" color="text.secondary">
                            Color: {item.selectedColor}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          R{item.totalPrice.toFixed(2)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">Total:</Typography>
                  <Typography variant="subtitle1">
                    R{total.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleViewCart}
                >
                  View Cart & Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default CartDropdown; 