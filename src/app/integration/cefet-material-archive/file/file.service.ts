import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';

export class FileService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async uploadFile(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post<{ url: string }>('/file/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
