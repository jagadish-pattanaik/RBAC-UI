import { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  useTheme,
  Skeleton,
} from '@mui/material';
import {
  People as PeopleIcon,
  VpnKey as RolesIcon,
  Security as PermissionsIcon,
  CheckCircle as ActiveIcon,
} from '@mui/icons-material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';
import { getPermissionIcon } from '../../utils/iconMapping';
import Shimmer from '../Common/Shimmer';

const StatCard = ({ title, value, icon, color, sx }) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color + '20',
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StatusChip = ({ status }) => {
  const theme = useTheme();
  const isActive = status === 'Active';
  
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: theme.palette.mode === 'dark'
          ? (isActive ? 'rgba(46, 125, 50, 0.15)' : 'rgba(211, 47, 47, 0.15)')
          : (isActive ? 'rgba(46, 125, 50, 0.08)' : 'rgba(211, 47, 47, 0.08)'),
        color: isActive ? '#4caf50' : '#f44336',
        border: `1px solid ${isActive ? '#4caf50' : '#f44336'}`,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: isActive ? '#4caf50' : '#f44336',
        }}
      />
      {status}
    </Box>
  );
};

const UserCountChip = ({ count }) => {
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
      <PeopleIcon sx={{ fontSize: 14 }} />
      {count} Users
    </Box>
  );
};

const PermissionChip = ({ permission }) => {
  const theme = useTheme();
  const IconComponent = getPermissionIcon(permission);
  
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
        margin: '0 4px 4px 0',
      }}
    >
      <IconComponent sx={{ fontSize: 14 }} />
      {permission}
    </Box>
  );
};

export default function Dashboard() {
  const { state, dispatch } = useRBAC();
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'operations', value: true } });
      const [users, roles, permissions] = await Promise.all([
        api.getUsers(),
        api.getRoles(),
        api.getPermissions(),
      ]);
      dispatch({ type: 'SET_USERS', payload: users });
      dispatch({ type: 'SET_ROLES', payload: roles });
      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'operations', value: false } });
    }
  };

  if (state.loadingStates.operations) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Dashboard Overview
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Shimmer width={40} height={40} borderRadius="50%" />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Shimmer width="60%" height={24} />
                    </Box>
                  </Box>
                  <Shimmer width="40%" height={32} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {[1, 2].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Paper sx={{ p: 2, height: '400px' }}>
                <Shimmer width="30%" height={24} sx={{ mb: 2 }} />
                {[1, 2, 3, 4, 5].map((subItem) => (
                  <Box key={subItem} sx={{ mb: 2 }}>
                    <Shimmer width="100%" height={60} />
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const activeUsers = state.users.filter(u => u.status === 'Active').length;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: { xs: 2, md: 4 } }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={state.users.length}
            icon={<PeopleIcon sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
            sx={{ 
              height: { xs: '140px', sm: 'auto' },
              '& .MuiCardContent-root': {
                p: { xs: 1.5, sm: 2 },
              },
              '& .MuiTypography-h6': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiTypography-h4': {
                fontSize: { xs: '1.5rem', sm: '2rem' },
              },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={activeUsers}
            icon={<ActiveIcon sx={{ color: theme.palette.success.main }} />}
            color={theme.palette.success.main}
            sx={{ 
              height: { xs: '140px', sm: 'auto' },
              '& .MuiCardContent-root': {
                p: { xs: 1.5, sm: 2 },
              },
              '& .MuiTypography-h6': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiTypography-h4': {
                fontSize: { xs: '1.5rem', sm: '2rem' },
              },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Roles"
            value={state.roles.length}
            icon={<RolesIcon sx={{ color: theme.palette.secondary.main }} />}
            color={theme.palette.secondary.main}
            sx={{ 
              height: { xs: '140px', sm: 'auto' },
              '& .MuiCardContent-root': {
                p: { xs: 1.5, sm: 2 },
              },
              '& .MuiTypography-h6': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiTypography-h4': {
                fontSize: { xs: '1.5rem', sm: '2rem' },
              },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Permissions"
            value={state.permissions.length}
            icon={<PermissionsIcon sx={{ color: theme.palette.warning.main }} />}
            color={theme.palette.warning.main}
            sx={{ 
              height: { xs: '140px', sm: 'auto' },
              '& .MuiCardContent-root': {
                p: { xs: 1.5, sm: 2 },
              },
              '& .MuiTypography-h6': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiTypography-h4': {
                fontSize: { xs: '1.5rem', sm: '2rem' },
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: { xs: 1.5, sm: 2 }, 
              height: '100%',
              boxShadow: theme => theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(0,0,0,0.3)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Users
            </Typography>
            <List>
              {state.users.slice(0, 5).map((user, index) => (
                <Box key={user.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={user.name}
                      secondary={`${user.email} • ${user.role}`}
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                      secondaryTypographyProps={{
                        color: 'text.secondary',
                      }}
                    />
                    <StatusChip status={user.status} />
                  </ListItem>
                  {index < state.users.length - 1 && 
                    <Divider sx={{ my: 1 }} />
                  }
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: { xs: 1.5, sm: 2 }, 
              height: '100%',
              boxShadow: theme => theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(0,0,0,0.3)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Role Overview
            </Typography>
            <List>
              {state.roles.map((role, index) => (
                <Box key={role.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                      },
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box sx={{ 
                      width: '100%', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 500,
                          color: 'text.primary',
                        }}
                      >
                        {role.name}
                      </Typography>
                      <UserCountChip 
                        count={state.users.filter(u => u.role === role.name).length}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {role.permissions.map((permission) => (
                        <PermissionChip key={permission} permission={permission} />
                      ))}
                    </Box>
                  </ListItem>
                  {index < state.roles.length - 1 && 
                    <Divider sx={{ my: 1 }} />
                  }
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 