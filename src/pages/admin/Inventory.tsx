import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Product, StockItem, StockOrder } from '../../types/inventory';
import StockOrderModal from '../../components/inventory/StockOrderModal';
import { inventoryService } from '../../services/inventoryService';
import InventoryHeader from '../../components/inventory/InventoryHeader';
import ClientManagement from '../../components/inventory/ClientManagement';
import ProductManagement from '../../components/inventory/ProductManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const Inventory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitializing(true);
        await inventoryService.initializeStockData();
        await loadStockItems();
      } catch (error) {
        console.error('Error initializing data:', error);
        setError('Failed to initialize inventory data');
      } finally {
        setInitializing(false);
      }
    };

    initializeData();
  }, []);

  const loadStockItems = async () => {
    try {
      setLoading(true);
      const items = await inventoryService.getStockItems();
      setStockItems(items);
    } catch (error) {
      console.error('Error loading stock items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockOrderSubmit = async (orderData: Omit<StockOrder, 'id'>) => {
    try {
      setLoading(true);
      await inventoryService.processStockOrder(orderData);
      await loadStockItems(); // Refresh the list
      setIsStockModalOpen(false);
    } catch (error) {
      console.error('Error processing stock order:', error);
      setError('Failed to process stock order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <InventoryHeader />
      
      {initializing ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <Box sx={{ my: 4 }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              aria-label="inventory management tabs"
            >
              <Tab label="Stock Management" />
              <Tab label="Products" />
              <Tab label="Clients" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setIsStockModalOpen(true);
                    setSelectedStock(null);
                  }}
                >
                  New Stock Order
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Current Stock</TableCell>
                      <TableCell>Minimum Stock</TableCell>
                      <TableCell>Last Order</TableCell>
                      <TableCell>Supplier</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockItems.map((item) => (
                      <TableRow 
                        key={item.id}
                        sx={{
                          backgroundColor: item.quantity <= item.minimumStock ? 'error.light' : 'inherit'
                        }}
                      >
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          <Typography
                            color={item.quantity <= item.minimumStock ? 'error' : 'inherit'}
                            fontWeight={item.quantity <= item.minimumStock ? 'bold' : 'inherit'}
                          >
                            {item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.minimumStock}</TableCell>
                        <TableCell>{new Date(item.lastOrderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>
                          <Typography
                            color={item.quantity <= item.minimumStock ? 'error' : 'success'}
                          >
                            {item.quantity <= item.minimumStock ? 'Low Stock' : 'In Stock'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color={item.quantity <= item.minimumStock ? 'error' : 'primary'}
                            onClick={() => {
                              setIsStockModalOpen(true);
                              setSelectedStock(item);
                            }}
                          >
                            {item.quantity <= item.minimumStock ? 'Restock' : 'Update'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ProductManagement />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <ClientManagement />
            </TabPanel>
          </Paper>
        </Box>
      )}

      <StockOrderModal
        open={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSubmit={handleStockOrderSubmit}
        currentStock={selectedStock}
      />
    </Container>
  );
};

export default Inventory; 