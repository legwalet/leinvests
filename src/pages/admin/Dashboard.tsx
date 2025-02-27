import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminUser } from '../../services/adminService';
import Orders from '../../components/admin/Orders';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'editor'>('editor');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const users = await adminService.getUsers();
    setUsers(users);
  };

  const handleAddUser = async () => {
    try {
      await adminService.createUser(newUserEmail, newUserRole);
      setNewUserEmail('');
      loadUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const userManagementContent = (
    <Box>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ mr: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'editor')}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => adminService.deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin dashboard tabs"
          >
            <Tab label="Orders" />
            <Tab label="Invoices" />
            <Tab label="Cost Breakdown" />
            <Tab label="User Management" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6">Orders Management</Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Recent Orders
              </Typography>
              <Orders />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6">Invoices</Typography>
            {/* Invoices table will go here */}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6">Cost Breakdown</Typography>
            {/* Cost breakdown analysis will go here */}
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            {userManagementContent}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 