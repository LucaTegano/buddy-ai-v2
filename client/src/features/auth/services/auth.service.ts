import apiClient from '@/shared/api/apiClient';
import { User } from '@/features/user/types/User';
import { AuthResponse, LoginCredentials, SignupCredentials, VerifyUserDto } from '../types/Auth';
import { AUTH_ENDPOINTS } from '../api/auth.api';

class AuthService {
  async signup(credentials: SignupCredentials): Promise<User> {
    const response = await apiClient.post<User>(AUTH_ENDPOINTS.SIGNUP, credentials);
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  }

  async verify(data: VerifyUserDto): Promise<void> {
    await apiClient.post(AUTH_ENDPOINTS.VERIFY, data);
  }

  async resendVerification(email: string): Promise<void> {
    await apiClient.post(`${AUTH_ENDPOINTS.RESEND_VERIFICATION}?email=${email}`);
  }
}

const authService = new AuthService();
export default authService;
