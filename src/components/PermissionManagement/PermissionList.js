import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Divider,
  useTheme,
  ListItemIcon,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  SupervisorAccount as ManageIcon,
} from '@mui/icons-material';

const getPermissionIcon = (permissionName) => {
  switch (permissionName) {
    case 'read':
      return <CheckIcon />;
    case 'write':
      return <EditIcon />;
    case 'delete':
      return <DeleteIcon />;
    case 'manage_users':
    case 'manage_roles':
      return <ManageIcon />;
    default:
      return <SecurityIcon />;
  }
};

export default function PermissionList({ permissions, loading }) {
  const theme = useTheme();

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
          <ListItem
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.02)',
              },
              borderRadius: 1,
            }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.warning.main,
                minWidth: 40,
              }}
            >
              {getPermissionIcon(permission.name)}
            </ListItemIcon>
            <ListItemText
              primary={permission.name}
              secondary={permission.description}
              primaryTypographyProps={{
                sx: { 
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                }
              }}
              secondaryTypographyProps={{
                sx: { color: theme.palette.text.secondary }
              }}
            />
          </ListItem>
          {index < permissions.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </List>
  );
} 