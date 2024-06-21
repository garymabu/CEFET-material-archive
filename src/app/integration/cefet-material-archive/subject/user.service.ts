import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { Subject } from '@/app/entity/subject.entity';

export class SubjectService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAll() {
    return this.httpClient.get<Subject[]>('/subject');
  }

  async createSubject(subject: { name: string; teacherId: number }) {
    return this.httpClient.post('/subject', subject);
  }

  async deleteSubject(subjectId: number) {
    return this.httpClient.delete(`/subject/${subjectId}`);
  }
}
