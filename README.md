# RBAC Dashboard

A Role-Based Access Control (RBAC) Admin Dashboard built with React and Material-UI. This application provides a user-friendly interface for managing users, roles, and permissions in a system.

## Features

### User Management
- View users in a tabular format
- Add, edit, and delete users
- Filter users by status and role
- Search users by name or email

### Role Management
- Create and manage roles
- Assign permissions to roles
- View role details and associated permissions
- Delete roles when no longer needed

### Permission Management
- View all system permissions
- Interactive permission matrix
- Assign/revoke permissions for roles
- Real-time permission updates

### Dashboard
- Overview of system statistics
- User count and status summary
- Role distribution
- Permission usage metrics

## Technical Stack

- React 18
- Material-UI v5
- React Router v6
- Context API for state management
- Axios for API calls (mock implementation)

## Getting Started

1. Clone the repository:

```
git clone <repository-link>
cd rbac-ui
```

Install dependencies:
```
npm install
```

Start the development server:
```
npm start
```

Open the application in your browser at http://localhost:3000.

## Project Structure

```
src/
├── components/
│   ├── Common/
│   │   └── Layout.js               # Main layout with navigation
│   │
│   ├── Dashboard/
│   │   └── Dashboard.js            # Overview dashboard component
│   │
│   ├── UserManagement/
│   │   ├── UserManagement.js       # User management container
│   │   ├── UserTable.js           # Users list table
│   │   ├── UserFormModal.js       # Add/Edit user modal
│   │   └── UserFilters.js         # Search and filter controls
│   │
│   ├── RoleManagement/
│   │   ├── RoleManagement.js      # Role management container
│   │   ├── RoleList.js           # Roles list view
│   │   └── RoleFormModal.js       # Add/Edit role modal
│   │
│   └── PermissionManagement/
│       ├── PermissionManagement.js # Permission management container
│       ├── PermissionList.js      # Permissions list view
│       └── PermissionMatrix.js    # Role-permission matrix
│
├── context/
│   └── RBACContext.js             # Global state management
│
├── services/
│   └── api.js                     # API service layer (mock)
│
├── styles/
│   └── theme.js                   # MUI theme configuration
│
├── App.js                         # Root component
└── index.js                       # Application entry point
```

## Component Details

### Common Components
- `Layout.js`: Provides the application shell with navigation and responsive drawer

### User Management
- `UserManagement.js`: Container component for user management features
- `UserTable.js`: Displays users in a table format with actions
- `UserFormModal.js`: Modal form for creating/editing users
- `UserFilters.js`: Search and filter controls for users

### Role Management
- `RoleManagement.js`: Container for role management features
- `RoleList.js`: Displays roles with their permissions
- `RoleFormModal.js`: Modal for creating/editing roles

### Permission Management
- `PermissionManagement.js`: Container for permission management
- `PermissionList.js`: Lists all system permissions
- `PermissionMatrix.js`: Interactive matrix for role-permission assignment

### State Management
- `RBACContext.js`: Context provider with reducer for global state
  - Manages users, roles, and permissions
  - Handles loading states
  - Manages error states

### Services
- `api.js`: Mock API service
  - Simulates backend calls
  - Manages mock data
  - Implements CRUD operations

### Styling
- `theme.js`: Material-UI theme customization
  - Defines color palette
  - Configures component defaults
  - Sets up responsive breakpoints

## How It Works
User Management:

Navigate to the User Management section to view and manage users.
Use the Add User button to add a new user. Assign a role and status while creating.
Edit user details or delete users as required.
Role Management:

Access the Role Management section to view and manage roles.
Use the Add Role button to create a new role and assign permissions.
Modify existing roles using the Edit option.
Permission Matrix:

Open the Permission Matrix to assign or revoke permissions dynamically.

## Future Enhancements
Integrate with a real backend API for persistence.
Add advanced features like role hierarchies or granular permission levels.
Implement dark mode for better UX.
This RBAC dashboard demonstrates best practices in frontend development while providing a robust foundation for managing roles and permissions.