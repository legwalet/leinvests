import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Collapse,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Order } from '../../types/services';
import { orderService } from '../../services/orderService';

interface OrderRowProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

const OrderRow = ({ order, onStatusChange }: OrderRowProps) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'processing':
        return 'info';
      default:
        return 'warning';
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.customerDetails.name}</TableCell>
        <TableCell>
          <FormControl size="small">
            <Select
              value={order.status}
              onChange={(e) => onStatusChange(order.id!, e.target.value as Order['status'])}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>R{order.totalAmount.toFixed(2)}</TableCell>
        <TableCell>{new Date(order.pickupDate).toLocaleString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Email: {order.customerDetails.email}</Typography>
                <Typography variant="body2">Phone: {order.customerDetails.phone}</Typography>
                <Typography variant="body2">Address: {order.customerDetails.address}</Typography>
                {order.customerDetails.notes && (
                  <Typography variant="body2">Notes: {order.customerDetails.notes}</Typography>
                )}
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Options</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && `, Color: ${item.selectedColor}`}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        R{item.totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await orderService.getAllOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Pickup Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow 
              key={order.id} 
              order={order} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders; 