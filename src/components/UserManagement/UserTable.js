import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import ActionButton from '../Common/ActionButton';
import { getRoleIcon } from '../../utils/iconMapping';
import Shimmer from '../Common/Shimmer';

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
  const IconComponent = getRoleIcon(role);
  
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
      <IconComponent sx={{ fontSize: 14 }} />
      {role}
    </Box>
  );
};

export default function UserTable({ users = [], onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((item) => (
              <TableRow key={item}>
                <TableCell><Shimmer width={150} /></TableCell>
                <TableCell><Shimmer width={200} /></TableCell>
                <TableCell><Shimmer width={100} /></TableCell>
                <TableCell><Shimmer width={80} /></TableCell>
                <TableCell align="right"><Shimmer width={100} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer sx={{ 
      overflowX: 'auto',
      '& .MuiTable-root': {
        minWidth: 650,
      }
    }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Status</TableCell>
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
              <TableCell align="left">{user.name || ''}</TableCell>
              <TableCell align="left">{user.email || ''}</TableCell>
              <TableCell align="left">
                <RoleChip role={user.role || ''} />
              </TableCell>
              <TableCell align="left">
                <StatusChip status={user.status || ''} />
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