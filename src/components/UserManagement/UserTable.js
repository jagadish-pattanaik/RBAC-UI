import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Box,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import ActionButton from '../Common/ActionButton';

const StatusChip = ({ status }) => {
  const theme = useTheme();
  const isActive = status === 'Active';
  
  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: 16,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor: theme.palette.mode === 'dark'
          ? (isActive ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)')
          : (isActive ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)'),
        color: isActive ? '#4caf50' : '#f44336',
        border: `1px solid ${isActive ? '#4caf50' : '#f44336'}`,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isActive ? '#4caf50' : '#f44336',
        }}
      />
      {status}
    </Box>
  );
};

const RoleChip = ({ role }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 12,
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(0, 0, 0, 0.08)',
        color: theme.palette.text.secondary,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <PersonIcon sx={{ fontSize: 14 }} />
      {role}
    </Box>
  );
};

export default function UserTable({ users, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id}
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RoleChip role={user.role} />
              </TableCell>
              <TableCell>
                <StatusChip status={user.status} />
              </TableCell>
              <TableCell align="right">
                <ActionButton
                  icon={<EditIcon />}
                  onClick={() => onEdit(user)}
                  tooltip="Edit user"
                />
                <ActionButton
                  icon={<DeleteIcon />}
                  onClick={() => onDelete(user.id)}
                  tooltip="Delete user"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 