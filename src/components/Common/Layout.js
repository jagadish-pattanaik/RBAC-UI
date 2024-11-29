import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Avatar,
  Divider,
  Tooltip,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  VpnKey as RolesIcon,
  Security as PermissionsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Security as SecurityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const drawerWidth = {
  xs: '280px',
  sm: 240,
};

export default function Layout({ children, onToggleTheme, currentTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Roles', icon: <RolesIcon />, path: '/roles' },
    { text: 'Permissions', icon: <PermissionsIcon />, path: '/permissions' },
  ];

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Dashboard';
  };

  const drawer = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      overflow: 'hidden',
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SecurityIcon />
          </Avatar>
          <Typography variant="h6" noWrap>
            RBAC Admin
          </Typography>
        </Box>
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{ 
            display: { sm: 'none' },
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List 
        sx={{ 
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.2)' 
              : 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
        }}
      >
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={isCurrentPath(item.path)}
            sx={{
              mx: 1,
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isCurrentPath(item.path)
                  ? theme.palette.primary.main
                  : 'inherit',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: isCurrentPath(item.path)
                  ? theme.palette.primary.main
                  : 'inherit',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onToggleTheme}
          startIcon={currentTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth.sm },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth.xs,
              border: 'none',
              overflow: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth.sm,
              border: 'none',
              overflow: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          height: '100vh',
          overflow: 'auto',
          backgroundColor: 'background.default',
          pt: { xs: '56px', sm: 3 },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '48px',
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            display: { sm: 'none' },
            px: 2,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              startIcon={<MenuIcon />}
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                textTransform: 'none',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Menu
            </Button>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {getCurrentPageTitle()}
            </Typography>
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
} 