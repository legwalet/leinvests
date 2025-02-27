import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Inventory as InventoryIcon } from '@mui/icons-material';

const InventoryHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Inventory Management</Typography>
      </Breadcrumbs>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InventoryIcon fontSize="large" color="primary" />
        <Typography variant="h4" component="h1">
          Inventory Management
        </Typography>
      </Box>
    </Box>
  );
};

export default InventoryHeader; 