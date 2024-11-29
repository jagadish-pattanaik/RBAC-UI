import { createTheme, alpha } from '@mui/material';

export const getTheme = (mode) => {
  const mainColor = '#2563eb'; // Modern blue
  const secondaryColor = '#3b82f6';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: mainColor,
        light: alpha(mainColor, 0.8),
        dark: alpha(mainColor, 1.2),
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: mode === 'dark' ? '#030712' : '#f8fafc',
        paper: mode === 'dark' ? '#111827' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#1e293b',
        secondary: mode === 'dark' ? '#cbd5e1' : '#64748b',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
        letterSpacing: 0.5,
        fontSize: '1.5rem',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: 0.5,
        fontSize: '1.125rem',
      },
      subtitle1: {
        fontWeight: 500,
        letterSpacing: 0.25,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*, *::before, *::after': {
            transition: 'none', // Disable global transitions
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: mode === 'dark' 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
            transition: 'background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
            '&:hover': {
              boxShadow: mode === 'dark'
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)'
                : '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.1),
            padding: '16px',
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === 'dark' 
              ? alpha('#000', 0.3) 
              : alpha('#000', 0.02),
            fontSize: '0.875rem',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.1s ease-in-out',
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? alpha('#fff', 0.03) 
                : alpha('#000', 0.02),
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 28,
            borderRadius: 6,
            fontWeight: 500,
            fontSize: '0.75rem',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'dark'
                ? '0 2px 4px rgba(0, 0, 0, 0.3)'
                : '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: mode === 'dark'
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            backgroundColor: mode === 'dark' ? '#1a2234' : '#ffffff',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            transition: 'all 0.1s ease-in-out',
            '&.Mui-focused': {
              transform: 'translateY(-1px)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' 
                  ? alpha(mainColor, 0.8) 
                  : mainColor,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            backgroundColor: mode === 'dark' ? '#1a2234' : '#ffffff',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark'
                ? '0 12px 20px rgba(0, 0, 0, 0.4)'
                : '0 12px 20px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              backgroundColor: mode === 'dark'
                ? alpha('#fff', 0.03)
                : alpha('#000', 0.02),
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            backgroundColor: mode === 'dark' 
              ? alpha('#0f172a', 0.9)
              : alpha('#ffffff', 0.9),
            borderBottom: `1px solid ${mode === 'dark' 
              ? alpha('#fff', 0.1) 
              : alpha('#000', 0.1)}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: 'none',
            backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
            boxShadow: mode === 'dark'
              ? '4px 0 8px rgba(0, 0, 0, 0.5)'
              : '4px 0 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          },
        },
      },
    },
  });
}; 