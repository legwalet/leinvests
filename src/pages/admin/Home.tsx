import { Box, Grid, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminHome = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Services',
      description: 'Browse our printing and design services',
      path: '/services',
      color: '#1976d2'
    },
    {
      title: 'Orders',
      description: 'View and manage orders',
      path: '/admin/dashboard',
      color: '#2e7d32'
    },
    {
      title: 'Inventory',
      description: 'Manage product inventory',
      path: '/admin/inventory',
      color: '#ed6c02'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/background.jpg)', // Make sure this image exists
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        pt: { xs: 4, sm: 8 },
        pb: { xs: 6, sm: 12 }
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: { xs: 4, sm: 6 },
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }
          }}
        >
          Welcome to Print & Design Studio
        </Typography>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 0 } }}
        >
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Paper
                  onClick={() => navigate(item.path)}
                  sx={{
                    height: { xs: '200px', sm: '250px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${item.color}80, ${item.color})`,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 8px 24px ${item.color}40`,
                      transform: 'translateY(-4px)',
                    },
                    borderRadius: 4,
                    textAlign: 'center'
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '2rem' },
                      fontWeight: 600
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      opacity: 0.9
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminHome; 