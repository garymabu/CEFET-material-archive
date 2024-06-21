import { BaseEntity } from './base-entity';
import { Material } from './material.entity';
import { Teacher } from './teacher.entity';

export interface Subject extends BaseEntity {
  teacher: Teacher;
  materials: Material[];
  teacherId: number;
  term: number;
  name: string;
}
