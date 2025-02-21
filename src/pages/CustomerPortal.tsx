import { Box, Typography, Container } from '@mui/material';

const CustomerPortal = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Customer Portal
        </Typography>
        <Typography variant="body1">
          Access your orders, invoices, and quotations here.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerPortal; 