import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import theme from './theme';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Services from './pages/Services';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/Dashboard';
import RequireAuth from './components/auth/RequireAuth';
import { useEffect, useState } from 'react';
import { initializeAdmin } from './config/initializeAdmin';
import { validateServices } from './utils/verifyServices';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Container, Alert } from '@mui/material';
import AdminHome from './pages/admin/Home';

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
          <UserProvider>
            <CartProvider>
              <Router>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route element={<RequireAuth />}>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Router>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App; 