// types/Auth.ts

import { User } from '@/shared/types/User';

export interface AuthResponse {
  success: boolean;
  token: string;
  tokenType: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// --- FIX IS HERE ---
// I've added the 'email' property and removed the redundant 'username'.
export interface SignupCredentials extends LoginCredentials {
  email: string;
}
// --- END OF FIX ---

export interface VerifyUserDto {
  email: string;
  verificationCode: string;
}

