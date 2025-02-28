import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { StockOrder, StockItem } from '../../types/inventory';

interface StockOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<StockOrder, 'id'>) => Promise<void>;
  currentStock?: StockItem;
}

const StockOrderModal = ({ open, onClose, onSubmit, currentStock }: StockOrderModalProps) => {
  const [formData, setFormData] = useState({
    productId: currentStock?.productId || '',
    productName: currentStock?.productName || '',
    quantity: currentStock?.quantity || 0,
    supplier: currentStock?.supplier || '',
    cost: 0,
    status: 'pending' as const,
  });

  useEffect(() => {
    if (currentStock) {
      setFormData({
        productId: currentStock.productId,
        productName: currentStock.productName,
        quantity: currentStock.quantity,
        supplier: currentStock.supplier || '',
        cost: currentStock.cost || 0,
        status: 'pending'
      });
    }
  }, [currentStock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const orderData = {
      ...formData,
      orderDate: now,
      status: 'pending' as const
    };
    await onSubmit(orderData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {currentStock ? 'Update Stock Order' : 'New Stock Order'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product ID"
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Cost"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {currentStock ? 'Update' : 'Create'} Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StockOrderModal; 