import { Box, Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard. Here you can manage your orders and view analytics.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard; 