import { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';

export default function Dashboard() {
  const { state, dispatch } = useRBAC();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const [users, roles, permissions] = await Promise.all([
        api.getUsers(),
        api.getRoles(),
        api.getPermissions(),
      ]);
      dispatch({ type: 'SET_USERS', payload: users });
      dispatch({ type: 'SET_ROLES', payload: roles });
      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Users Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Total Users: ${state.users.length}`}
                  secondary={`Active: ${state.users.filter(u => u.status === 'Active').length}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Roles Summary
            </Typography>
            <List>
              {state.roles.map(role => (
                <ListItem key={role.id}>
                  <ListItemText
                    primary={role.name}
                    secondary={`Permissions: ${role.permissions.length}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Permissions Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Total Permissions: ${state.permissions.length}`}
                  secondary="Manage system access and capabilities"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 