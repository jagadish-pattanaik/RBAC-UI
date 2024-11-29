import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        gap: 2,
      }}
    >
      <CircularProgress
        size={32}
        thickness={4}
        sx={{
          color: (theme) => theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  );
} 