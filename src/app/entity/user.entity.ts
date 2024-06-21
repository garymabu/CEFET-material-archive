import { UserType } from '../integration/cefet-material-archive/auth/auth.service';

export interface User {
  type: UserType;
  displayName: string;
  userName: string;
  email: string;
}
