import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';

export class SubjectService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllSubjects() {
    return this.httpClient.get('/subject');
  }
}
