import { createContext, useContext, useReducer, useEffect } from 'react';

const RBACContext = createContext();

// Try to load initial state from localStorage
const getInitialState = () => {
  try {
    const savedState = localStorage.getItem('rbacState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  
  return {
    users: [],
    roles: [],
    permissions: [],
    loadingStates: {
      users: false,
      roles: false,
      permissions: false,
      operations: false,
    },
    error: null
  };
};

function rbacReducer(state, action) {
  let newState;
  
  switch (action.type) {
    case 'SET_LOADING':
      newState = {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.value
        }
      };
      break;
    case 'SET_ERROR':
      newState = { ...state, error: action.payload };
      break;
    case 'CLEAR_ERROR':
      newState = { ...state, error: null };
      break;
    case 'SET_USERS':
      newState = { ...state, users: action.payload };
      break;
    case 'SET_ROLES':
      newState = { ...state, roles: action.payload };
      break;
    case 'SET_PERMISSIONS':
      newState = { ...state, permissions: action.payload };
      break;
    case 'ADD_USER':
      newState = { ...state, users: [...state.users, action.payload] };
      break;
    case 'UPDATE_USER':
      newState = {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
      break;
    case 'DELETE_USER':
      newState = {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
      break;
    case 'ADD_ROLE':
      newState = { ...state, roles: [...state.roles, action.payload] };
      break;
    case 'UPDATE_ROLE':
      newState = {
        ...state,
        roles: state.roles.map(role => 
          role.id === action.payload.id ? action.payload : role
        )
      };
      break;
    case 'DELETE_ROLE':
      newState = {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload)
      };
      break;
    default:
      newState = state;
  }

  // Save state to localStorage after each update
  try {
    localStorage.setItem('rbacState', JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }

  return newState;
}

export function RBACProvider({ children }) {
  const [state, dispatch] = useReducer(rbacReducer, getInitialState());

  // Optional: Add window event listener to save state before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('rbacState', JSON.stringify(state));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state]);

  return (
    <RBACContext.Provider value={{ state, dispatch }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
} 