import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { Material, MaterialType } from '@/app/entity/material.entity';

export interface CreateMaterialDto {
  description: string;
  dataUrl: string;
  subjectId: number;
}

export class MaterialService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllMaterials() {
    return this.httpClient.get<Material[]>('/material');
  }
  async createMaterial(material: CreateMaterialDto) {
    return this.httpClient.post('/material', material);
  }
  async deleteMaterial(materialId: number) {
    return this.httpClient.delete(`/material/${materialId}`);
  }
}
