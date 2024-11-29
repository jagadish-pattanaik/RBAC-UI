import { IconButton, Tooltip, alpha } from '@mui/material';

export default function ActionButton({ icon, onClick, tooltip, color = 'default' }) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={onClick}
        size="small"
        sx={{
          color: (theme) => theme.palette.mode === 'dark' 
            ? alpha(theme.palette.text.primary, 0.7)
            : alpha(theme.palette.text.secondary, 0.7),
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.05),
          },
          transition: 'all 0.2s',
          mx: 0.5,
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
} 