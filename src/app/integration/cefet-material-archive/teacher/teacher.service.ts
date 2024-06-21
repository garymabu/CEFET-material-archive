import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';

export class TeacherService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllTeachers() {
    return this.httpClient.get('/teacher');
  }
}
