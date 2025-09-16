import { User } from '@/features/user/types/User';
import { LoginCredentials, SignupCredentials } from '../types/Auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // This property is necessary to match your store's state
  isLoading: boolean; // For login/logout actions
  isCheckingAuth: boolean; // For the initial app load check
  error: string | null;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}