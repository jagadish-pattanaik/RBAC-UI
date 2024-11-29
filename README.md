# RBAC Dashboard

A modern Role-Based Access Control (RBAC) Admin Dashboard built with React and Material-UI. This application provides a user-friendly interface for managing users, roles, and permissions with a focus on user experience and responsive design.

## Features

### Core Features
- Dark mode by default with theme persistence
- Responsive design optimized for mobile and desktop
- Data persistence across sessions using localStorage
- Professional loading states with shimmer effects
- Real-time updates and feedback

### User Management
- View users in a responsive table format
- Add, edit, and delete users with modal forms
- Filter users by status and role
- Search users by name or email
- Visual status indicators
- Role-based icons and badges

### Role Management
- Create and manage roles with permissions
- Visual permission chips with icons
- Intuitive role editing interface
- Role-specific icons
- User count tracking per role

### Permission Management
- Interactive permission matrix
- Visual permission list with icons
- Real-time permission updates
- Drag-and-drop support (coming soon)
- Permission grouping and categorization

### Dashboard
- Modern stat cards with animations
- User activity overview
- Role distribution visualization
- Permission usage metrics
- Real-time data updates
- Responsive grid layout

## Technical Stack

- React 18
- Material-UI v5
- React Router v6
- Context API for state management
- Local Storage for data persistence
- Custom hooks and utilities

## Enhanced UI Features

### Modern Design Elements
- Smooth transitions and animations
- Consistent spacing and typography
- Professional color scheme
- Responsive components
- Intuitive navigation

### Loading States
- Shimmer loading effects
- Skeleton placeholders
- Loading indicators
- Smooth state transitions

### Mobile Optimization
- Touch-friendly interface
- Responsive tables and grids
- Optimized navigation drawer
- Mobile-first approach

### Dark Mode
- Default dark theme
- Persistent theme preference
- Optimized color contrasts
- Consistent styling

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
│   │   ├── Layout.js               # Main layout with navigation
│   │   ├── ActionButton.js         # Reusable action button component
│   │   ├── LoadingState.js         # Loading state component
│   │   └── Shimmer.js             # Shimmer loading effect
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
├── utils/
│   └── iconMapping.js             # Icon mapping utilities
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

## Additional Components

### Common Components
- `Shimmer.js`: Provides shimmer loading effects
- `LoadingState.js`: Centralized loading component
- `ActionButton.js`: Reusable action button with tooltip
- `IconMapping.js`: Centralized icon management

### Utilities
- Theme configuration with dark mode support
- Icon mapping utilities
- Loading state management
- Data persistence helpers

### State Management
- Enhanced Context API implementation
- Loading state management
- Error handling
- Data persistence
- Real-time updates

## Data Persistence
The application now includes:
- Local storage integration
- Session persistence
- State recovery
- Automatic data saving
- Error handling for storage issues

## Performance Optimizations
- Optimized re-renders
- Efficient state updates
- Lazy loading
- Memoized components
- Debounced actions

## Future Enhancements
- Role hierarchies
- Advanced permissions
- Activity logging
- Data export
- Batch operations
- Real-time collaboration
- Advanced search filters
- Custom themes

---
Made with ❤️ by [Jagadish Prasad Pattanaik](https://github.com/jagadish-pattanaik)