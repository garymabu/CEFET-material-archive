import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { Material } from '@/app/entity/material.entity';

export class MaterialService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllMaterials() {
    return this.httpClient.get<Material[]>('/material');
  }
}
