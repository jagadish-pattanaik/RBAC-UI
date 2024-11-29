import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

export default function RoleList({ roles, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List>
      {roles.map((role) => (
        <ListItem key={role.id}>
          <ListItemText
            primary={role.name}
            secondary={
              <Box sx={{ mt: 1 }}>
                {role.permissions.map((permission) => (
                  <Chip
                    key={permission}
                    label={permission}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEdit(role)} sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(role.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
} 