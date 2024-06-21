import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';

export class UserService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllUsers() {
    return this.httpClient.get('/user');
  }
}
