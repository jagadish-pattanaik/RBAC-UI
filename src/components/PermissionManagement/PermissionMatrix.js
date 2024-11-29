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
} from '@mui/material';

export default function PermissionMatrix({ roles, permissions, onPermissionChange, loading }) {
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
            <TableCell>Role / Permission</TableCell>
            {permissions.map((permission) => (
              <TableCell key={permission.id} align="center">
                <Tooltip title={permission.description} placement="top">
                  <span style={{ textTransform: 'capitalize' }}>
                    {permission.name}
                  </span>
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell component="th" scope="row">
                {role.name}
              </TableCell>
              {permissions.map((permission) => (
                <TableCell key={`${role.id}-${permission.id}`} align="center">
                  <Checkbox
                    checked={role.permissions.includes(permission.name)}
                    onChange={(e) =>
                      onPermissionChange(role.id, permission.name, e.target.checked)
                    }
                    size="small"
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