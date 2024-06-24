import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { AuthStorage } from '@/app/storage/auth.storage';
import { User } from '@/app/entity/user.entity';
import { UserType } from '../auth/auth.service';

export interface CreateUserDto {
  name: string;
  email: string;
  type: UserType;
}

export class UserService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getCurrentUser() {
    const userId = AuthStorage.get().userId;
    console.log('getting current user', userId);
    return this.httpClient.get<User>(`/user/${userId}`);
  }

  async getAllStudents(name?: string, date?: string) {
    let url = '/subject';
    if (name) {
      url += `?name=${name}`;
    }
    if (date) {
      url += `${name ? '&' : '?'}createdAt=${date}`;
    }
    return this.httpClient.get<User[]>(url);
  }

  async changePassword(userId: number, password: string) {
    return this.httpClient.patch(`/user/${userId}/update-password`, {
      password,
    });
  }

  async createUser(user: CreateUserDto) {
    return this.httpClient.post<User>('/user', user);
  }

  async deleteStudent(userId: number) {
    return this.httpClient.delete(`/user/${userId}`);
  }
}
