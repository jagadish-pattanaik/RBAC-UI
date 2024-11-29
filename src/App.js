import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RBACProvider } from './context/RBACContext';
import { getTheme } from './styles/theme';
import Layout from './components/Common/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/UserManagement/UserManagement';
import RoleManagement from './components/RoleManagement/RoleManagement';
import PermissionManagement from './components/PermissionManagement/PermissionManagement';
import { useState, useMemo } from 'react';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
