import axios from 'axios';

// Initialize data from localStorage or use defaults
const getInitialData = () => {
  try {
    const savedData = localStorage.getItem('rbacData');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  
  // Default data if nothing in localStorage
  return {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    ],
    roles: [
      { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete', 'manage users', 'manage roles'] },
      { id: 2, name: 'Editor', permissions: ['read', 'write'] },
      { id: 3, name: 'Viewer', permissions: ['read'] },
    ],
    permissions: [
      { id: 1, name: 'read', description: 'Can read data' },
      { id: 2, name: 'write', description: 'Can create and edit data' },
      { id: 3, name: 'delete', description: 'Can delete data' },
      { id: 4, name: 'manage users', description: 'Can manage users' },
      { id: 5, name: 'manage roles', description: 'Can manage roles' },
    ],
  };
};

let data = getInitialData();

// Helper function to save data to localStorage
const saveData = () => {
  try {
    localStorage.setItem('rbacData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Simulated API calls with persistence
export const api = {
  getUsers: () => new Promise((resolve) => {
    setTimeout(() => resolve([...data.users]), 500);
  }),

  getRoles: () => new Promise((resolve) => {
    setTimeout(() => resolve([...data.roles]), 500);
  }),

  getPermissions: () => new Promise((resolve) => {
    setTimeout(() => resolve([...data.permissions]), 500);
  }),
  
  createUser: (user) => new Promise((resolve) => {
    const newUser = { ...user, id: Date.now() };
    data.users = [...data.users, newUser];
    saveData();
    setTimeout(() => resolve(newUser), 500);
  }),
  
  updateUser: (user) => new Promise((resolve) => {
    data.users = data.users.map(u => u.id === user.id ? user : u);
    saveData();
    setTimeout(() => resolve(user), 500);
  }),
  
  deleteUser: (id) => new Promise((resolve) => {
    data.users = data.users.filter(u => u.id !== id);
    saveData();
    setTimeout(() => resolve(id), 500);
  }),
  
  createRole: (role) => new Promise((resolve) => {
    const newRole = { ...role, id: Date.now() };
    data.roles = [...data.roles, newRole];
    saveData();
    setTimeout(() => resolve(newRole), 500);
  }),
  
  updateRole: (role) => new Promise((resolve) => {
    data.roles = data.roles.map(r => r.id === role.id ? role : r);
    saveData();
    setTimeout(() => resolve(role), 500);
  }),
  
  deleteRole: (id) => new Promise((resolve) => {
    data.roles = data.roles.filter(r => r.id !== id);
    saveData();
    setTimeout(() => resolve(id), 500);
  }),

  // Add method to reset data to defaults
  resetData: () => new Promise((resolve) => {
    data = getInitialData();
    localStorage.removeItem('rbacData');
    setTimeout(() => resolve(), 500);
  }),
}; 