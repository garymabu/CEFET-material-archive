import { BaseEntity } from './base-entity';
import { Subject } from './subject.entity';

export enum MaterialType {
  SLIDE,
  SUPPORT_MATERIAL,
  EXAM,
  OTHER,
}

export interface Material extends BaseEntity {
  subject: Subject;
  type: MaterialType;
  description: string;
  dataUrl: string;
  subjectId: number;
}

export interface MaterialWithRating extends Material {
  rating: number;
}
