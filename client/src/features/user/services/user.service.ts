import apiClient from '@/shared/api/apiClient';
import { User } from '../types/User';

class UserService {
  async getSelf(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  }
}

const userService = new UserService();
export default userService;
