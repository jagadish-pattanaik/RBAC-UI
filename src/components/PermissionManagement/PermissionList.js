import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  useTheme,
  ListItemIcon,
} from '@mui/material';
import { getPermissionIcon } from '../../utils/iconMapping';
import Shimmer from '../Common/Shimmer';

export default function PermissionList({ permissions, loading }) {
  const theme = useTheme();

  if (loading) {
    return (
      <List>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item}>
            <ListItem>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Shimmer width={24} height={24} borderRadius="50%" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Shimmer width="40%" height={20} sx={{ mb: 1 }} />
                  <Shimmer width="70%" height={16} />
                </Box>
              </Box>
            </ListItem>
            {item < 5 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>
    );
  }

  return (
    <List>
      {permissions.map((permission, index) => {
        const IconComponent = getPermissionIcon(permission.name);
        
        return (
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
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
                  minWidth: 40,
                }}
              >
                <IconComponent sx={{ fontSize: 20 }} />
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
        );
      })}
    </List>
  );
} 