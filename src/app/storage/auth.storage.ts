import { UserType } from '../integration/cefet-material-archive/auth/auth.service';

export interface AuthStorageData {
  bearerToken: string;
  userType: UserType;
  userId: number;
}

export class AuthStorage {
  static get() {
    return <AuthStorageData>JSON.parse(localStorage.getItem('token') || '{}');
  }
  static set(token: AuthStorageData) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  static clear() {
    localStorage.removeItem('token');
  }
}
