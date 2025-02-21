import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { motion } from 'framer-motion';

const AdminHome = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome to Print Design Studio
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Admin Dashboard & Management System
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Services Management
                </Typography>
                <Typography variant="body1" paragraph>
                  View and manage all print design services
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/services')}
                >
                  Manage Services
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Orders & Cart
                </Typography>
                <Typography variant="body1" paragraph>
                  View and manage customer orders
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/cart')}
                >
                  View Orders
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Admin Dashboard
                </Typography>
                <Typography variant="body1" paragraph>
                  Access advanced admin features
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminHome; 