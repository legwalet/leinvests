import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { Suspense, lazy, useEffect, useState } from 'react';
import { initializeAdmin } from './config/initializeAdmin';
import { validateServices } from './utils/verifyServices';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Container, Alert, CircularProgress } from '@mui/material';
import theme from './theme';
import Checkout from './components/checkout/Checkout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import OrderConfirmation from './pages/OrderConfirmation';

// Lazy load components
const Auth = lazy(() => import('./pages/Auth'));
const Services = lazy(() => import('./pages/Services'));
const Cart = lazy(() => import('./pages/Cart'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminHome = lazy(() => import('./pages/admin/Home'));
const RequireAuth = lazy(() => import('./components/auth/RequireAuth'));
const Inventory = lazy(() => import('./pages/admin/Inventory'));

// Loading component
const LoadingFallback = () => (
  <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <CircularProgress />
  </Container>
);

const queryClient = new QueryClient();

function App() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeAdmin();
        validateServices();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
    init();
  }, []);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UserProvider>
              <CartProvider>
                <Router>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/auth" element={<Auth />} />
                      <Route element={<RequireAuth />}>
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/inventory" element={<Inventory />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </Router>
              </CartProvider>
            </UserProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App; 