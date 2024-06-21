import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { Subject } from '@/app/entity/subject.entity';

export class SubjectService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAll() {
    return this.httpClient.get<Subject[]>('/subject');
  }
}
