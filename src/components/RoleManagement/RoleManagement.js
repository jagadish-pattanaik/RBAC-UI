import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';
import RoleList from './RoleList';
import RoleFormModal from './RoleFormModal';

export default function RoleManagement() {
  const { state, dispatch } = useRBAC();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const roles = await api.getRoles();
      dispatch({ type: 'SET_ROLES', payload: roles });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissions = await api.getPermissions();
      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setOpenModal(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await api.deleteRole(roleId);
      dispatch({ type: 'DELETE_ROLE', payload: roleId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Role Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </Box>

      <Paper>
        <RoleList
          roles={state.roles}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          loading={state.loading}
        />
      </Paper>

      <RoleFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        role={selectedRole}
        permissions={state.permissions}
      />
    </Box>
  );
} 