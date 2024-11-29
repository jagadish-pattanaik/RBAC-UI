import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { RBACProvider } from './context/RBACContext';
import { getTheme } from './styles/theme';
import Layout from './components/Common/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/UserManagement/UserManagement';
import RoleManagement from './components/RoleManagement/RoleManagement';
import PermissionManagement from './components/PermissionManagement/PermissionManagement';
import { useState, useMemo, useEffect } from 'react';

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', 'dark');
  }, []);

  const toggleTheme = () => {
    document.documentElement.style.setProperty('color-scheme', mode === 'light' ? 'dark' : 'light');
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.1s ease-in-out',
      }}>
        <RBACProvider>
          <Router>
            <Layout onToggleTheme={toggleTheme} currentTheme={mode}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/roles" element={<RoleManagement />} />
                <Route path="/permissions" element={<PermissionManagement />} />
              </Routes>
            </Layout>
          </Router>
        </RBACProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
