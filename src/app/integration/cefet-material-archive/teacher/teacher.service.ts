import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { UserService } from '../user/user.service';
import { UserType } from '../auth/auth.service';

export class TeacherService {
  constructor(
    private readonly httpClient: AxiosInstance = client,
    private readonly userService: UserService = new UserService()
  ) {}

  async createTeacher(teacher: { name: string; email: string }) {
    const {
      data: { id },
    } = await this.userService.createUser({
      name: teacher.name,
      email: teacher.email,
      type: UserType.TEACHE,
    });
    return this.httpClient.post('/teacher', {
      userId: id,
    });
  }
  
  async getAll(name?: string, date?: string) {
    let url = '/subject';
    if (name) {
      url += `?name=${name}`;
    }
    if (date) {
      url += `${name ? '&' : '?'}createdAt=${date}`;
    }
    return this.httpClient.get(url);
  }

  async deleteTeacher(teacherId: number) {
    return this.httpClient.delete(`/teacher/${teacherId}`);
  }
}
