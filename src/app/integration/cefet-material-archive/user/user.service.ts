import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { AuthStorage } from '@/app/storage/auth.storage';
import { User } from '@/app/entity/user.entity';

export class UserService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllUsers() {
    return this.httpClient.get('/user');
  }

  async getCurrentUser() {
    const userId = AuthStorage.get().userId;
    return this.httpClient.get<User>(`/user/${userId}`);
  }

  async changePassword(userId: number, password: string) {
    return this.httpClient.patch(`/user/${userId}/update-password`, {
      password,
    });
  }
}
