import axios from 'axios';

// Mock data - Convert to let so we can update it
let mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
];

let mockRoles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'Viewer', permissions: ['read'] },
];

const mockPermissions = [
  { id: 1, name: 'read', description: 'Can read data' },
  { id: 2, name: 'write', description: 'Can create and edit data' },
  { id: 3, name: 'delete', description: 'Can delete data' },
  { id: 4, name: 'manage_users', description: 'Can manage users' },
  { id: 5, name: 'manage_roles', description: 'Can manage roles' },
];

// Simulated API calls with mock data updates
export const api = {
  getUsers: () => new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 500)),
  getRoles: () => new Promise((resolve) => setTimeout(() => resolve([...mockRoles]), 500)),
  getPermissions: () => new Promise((resolve) => setTimeout(() => resolve([...mockPermissions]), 500)),
  
  createUser: (user) => new Promise((resolve) => {
    const newUser = { ...user, id: Date.now() };
    mockUsers = [...mockUsers, newUser];
    setTimeout(() => resolve(newUser), 500);
  }),
  
  updateUser: (user) => new Promise((resolve) => {
    mockUsers = mockUsers.map(u => u.id === user.id ? user : u);
    setTimeout(() => resolve(user), 500);
  }),
  
  deleteUser: (id) => new Promise((resolve) => {
    mockUsers = mockUsers.filter(u => u.id !== id);
    setTimeout(() => resolve(id), 500);
  }),
  
  createRole: (role) => new Promise((resolve) => {
    const newRole = { ...role, id: Date.now() };
    mockRoles = [...mockRoles, newRole];
    setTimeout(() => resolve(newRole), 500);
  }),
  
  updateRole: (role) => new Promise((resolve) => {
    mockRoles = mockRoles.map(r => r.id === role.id ? role : r);
    setTimeout(() => resolve(role), 500);
  }),
  
  deleteRole: (id) => new Promise((resolve) => {
    mockRoles = mockRoles.filter(r => r.id !== id);
    setTimeout(() => resolve(id), 500);
  }),
}; 