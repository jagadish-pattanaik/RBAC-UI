import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  CircularProgress,
  Box,
  Tooltip,
  useTheme,
  Typography,
} from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

export default function PermissionMatrix({ roles, permissions, onPermissionChange, loading }) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell 
              sx={{ 
                fontWeight: 600,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.02)',
                padding: '16px',
              }}
            >
              Role / Permission
            </TableCell>
            {permissions.map((permission) => (
              <TableCell 
                key={permission.id} 
                align="center"
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                  padding: '16px',
                }}
              >
                <Tooltip 
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        {permission.name}
                      </Typography>
                      <Typography variant="body2">
                        {permission.description}
                      </Typography>
                    </Box>
                  }
                  placement="top"
                >
                  <Box
                    sx={{
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: 16 }} />
                    {permission.name}
                  </Box>
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow 
              key={role.id}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                },
              }}
            >
              <TableCell 
                component="th" 
                scope="row"
                sx={{ 
                  fontWeight: 500,
                  padding: '16px',
                }}
              >
                {role.name}
              </TableCell>
              {permissions.map((permission) => (
                <TableCell 
                  key={`${role.id}-${permission.id}`} 
                  align="center"
                  sx={{ padding: '16px' }}
                >
                  <Checkbox
                    checked={role.permissions.includes(permission.name)}
                    onChange={(e) =>
                      onPermissionChange(role.id, permission.name, e.target.checked)
                    }
                    size="small"
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.2)',
                      '&.Mui-checked': {
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                      },
                      padding: 0.5,
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 