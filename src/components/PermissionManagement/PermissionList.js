import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material';

export default function PermissionList({ permissions, loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List>
      {permissions.map((permission, index) => (
        <Box key={permission.id}>
          <ListItem>
            <ListItemText
              primary={permission.name}
              secondary={permission.description}
              primaryTypographyProps={{
                sx: { textTransform: 'capitalize' }
              }}
            />
          </ListItem>
          {index < permissions.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
} 