import { Box, keyframes } from '@mui/material';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export default function Shimmer({ width = '100%', height = '20px', borderRadius = '4px' }) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius,
        background: theme => `linear-gradient(
          90deg,
          ${theme.palette.mode === 'dark' ? '#1e293b' : '#f0f0f0'} 0%,
          ${theme.palette.mode === 'dark' ? '#334155' : '#f7f7f7'} 50%,
          ${theme.palette.mode === 'dark' ? '#1e293b' : '#f0f0f0'} 100%
        )`,
        backgroundSize: '2000px 100%',
        animation: `${shimmer} 2s linear infinite`,
      }}
    />
  );
} 