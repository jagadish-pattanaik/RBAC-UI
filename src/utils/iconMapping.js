import {
  Security as SecurityIcon,
  Visibility as ReadIcon,
  Edit as WriteIcon,
  Delete as DeleteIcon,
  ManageAccounts as ManageUsersIcon,
  AdminPanelSettings as ManageRolesIcon,
  SupervisorAccount as AdminIcon,
  Edit as EditorIcon,
  RemoveRedEye as ViewerIcon,
  Person as UserIcon,
} from '@mui/icons-material';

export const getPermissionIcon = (permissionName) => {
  switch (permissionName.toLowerCase()) {
    case 'read':
      return ReadIcon;
    case 'write':
      return WriteIcon;
    case 'delete':
      return DeleteIcon;
    case 'manage users':
      return ManageUsersIcon;
    case 'manage roles':
      return ManageRolesIcon;
    default:
      return SecurityIcon;
  }
};

export const getRoleIcon = (roleName) => {
  switch (roleName.toLowerCase()) {
    case 'admin':
      return AdminIcon;
    case 'editor':
      return EditorIcon;
    case 'viewer':
      return ViewerIcon;
    default:
      return UserIcon;
  }
}; 