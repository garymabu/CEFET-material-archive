import { BaseEntity } from './base-entity';
import { Subject } from './subject.entity';
import { User } from './user.entity';

export interface Teacher extends BaseEntity {
  subjects: Subject[];
  user: User;
  userId: number;
}
