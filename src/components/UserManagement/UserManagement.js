import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';
import UserTable from './UserTable';
import UserFormModal from './UserFormModal';
import UserFilters from './UserFilters';

export default function UserManagement() {
  const { state, dispatch } = useRBAC();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: 'all', role: 'all' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'users', value: true } });
      const users = await api.getUsers();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'users', value: false } });
    }
  };

  const fetchRoles = async () => {
    try {
      const roles = await api.getRoles();
      dispatch({ type: 'SET_ROLES', payload: roles });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      dispatch({ type: 'DELETE_USER', payload: userId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const filteredUsers = state.users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         user.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <Paper 
        sx={{ 
          mb: 2,
          p: { xs: 2, sm: 2 },
          borderRadius: 2,
        }}
      >
        <UserFilters filters={filters} setFilters={setFilters} roles={state.roles} />
      </Paper>

      <Paper 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          loading={state.loadingStates.users}
        />
      </Paper>

      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        user={selectedUser}
        roles={state.roles}
      />
    </Box>
  );
} 