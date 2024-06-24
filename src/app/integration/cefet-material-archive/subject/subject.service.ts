import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { Subject } from '@/app/entity/subject.entity';

export class SubjectService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAll(name?: string, date?: string) {
    let url = '/subject';
    if (name) {
      url += `?name=${name}`;
    }
    if (date) {
      url += `${name ? '&' : '?'}createdAt=${date}`;
    }
    return this.httpClient.get<Subject[]>(url);
  }

  async createSubject(subject: { name: string; teacherId: number, term: number }) {
    return this.httpClient.post('/subject', subject);
  }

  async deleteSubject(subjectId: number) {
    return this.httpClient.delete(`/subject/${subjectId}`);
  }
}
