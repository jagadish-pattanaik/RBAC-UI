import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function UserFilters({ filters, setFilters, roles }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2,
      flexDirection: { xs: 'column', sm: 'row' },
      '& .MuiFormControl-root': {
        minWidth: { xs: '100%', sm: 120 }
      }
    }}>
      <TextField
        label="Search"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        size="small"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          label="Role"
        >
          <MenuItem value="all">All</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
} 