import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Alert, Snackbar } from '@mui/material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';
import PermissionMatrix from './PermissionMatrix';
import PermissionList from './PermissionList';

export default function PermissionManagement() {
  const { state, dispatch } = useRBAC();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
    
    // Cleanup function to clear error state
    return () => {
      dispatch({ type: 'CLEAR_ERROR' });
    };
  }, []);

  const fetchPermissions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'permissions', value: true } });
      const permissions = await api.getPermissions();
      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'permissions', value: false } });
    }
  };

  const fetchRoles = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'roles', value: true } });
      const roles = await api.getRoles();
      dispatch({ type: 'SET_ROLES', payload: roles });
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'roles', value: false } });
    }
  };

  const handlePermissionUpdate = async (roleId, permission, isGranted) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'operations', value: true } });
      const role = state.roles.find(r => r.id === roleId);
      if (!role) throw new Error('Role not found');

      const updatedPermissions = isGranted
        ? [...new Set([...role.permissions, permission])] // Ensure unique permissions
        : role.permissions.filter(p => p !== permission);
      
      const updatedRole = { ...role, permissions: updatedPermissions };
      const result = await api.updateRole(updatedRole);
      
      dispatch({ type: 'UPDATE_ROLE', payload: result });
      showSnackbar('Permissions updated successfully');
      
      // Refresh roles to ensure consistency
      await fetchRoles();
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'operations', value: false } });
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isLoading = state.loadingStates.permissions || 
                    state.loadingStates.roles || 
                    state.loadingStates.operations;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Permission Management
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Permission List
          </Typography>
          <PermissionList 
            permissions={state.permissions} 
            loading={state.loadingStates.permissions} 
          />
        </Paper>

        <Paper sx={{ flex: 2, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Role Permissions Matrix
          </Typography>
          <PermissionMatrix
            roles={state.roles}
            permissions={state.permissions}
            onPermissionChange={handlePermissionUpdate}
            loading={isLoading}
          />
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 