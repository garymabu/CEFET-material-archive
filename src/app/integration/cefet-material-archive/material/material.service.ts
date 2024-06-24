import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';
import { MaterialWithRating } from '@/app/entity/material.entity';

export interface CreateMaterialDto {
  description: string;
  dataUrl: string;
  subjectId: number;
}

export class MaterialService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async getAllWithRating(name?: string, subject?: string) {
    let url = '/subject';
    if (name) {
      url += `?name=${name}`;
    }
    if (subject) {
      url += `${name ? '&' : '?'}subject=${subject}`;
    }
    return this.httpClient.get<MaterialWithRating[]>(url);
  }


  async create(material: CreateMaterialDto) {
    return this.httpClient.post('/material', material);
  }
  async delete(materialId: number) {
    return this.httpClient.delete(`/material/${materialId}`);
  }
  async rateMaterial(materialId: number, rating: number) {
    return this.httpClient.post(`/material/${materialId}/rate`, {
      value: rating,
    });
  }
}
