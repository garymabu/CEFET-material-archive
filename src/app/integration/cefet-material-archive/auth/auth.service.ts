import { AxiosInstance } from 'axios';
import client from '../../axios/axios.client';

export interface LoginDataDTO {
  username: string;
  password: string;
}
export enum UserType {
  ADMIN,
  STUDENT,
  TEACHE,
}

export interface AuthResult {
  bearerToken: string;
  userId: number;
  userType: UserType;
}

export class AuthService {
  constructor(private readonly httpClient: AxiosInstance = client) {}

  async challengeEmailIfExists(email: string) {
    return await this.httpClient.post<{
      userId: string;
    }>(`/login/challenge/${email}`);
  }

  async applyChallengeResults(userId: string, code: string) {
    return this.httpClient.post<AuthResult>(
      `/login/challenge/${userId}/${code}`
    );
  }

  async login({ password, username }: LoginDataDTO) {
    console.log(process.env.NEXT_PUBLIC_MAIN_API_BASE_URL);
    return this.httpClient.post<AuthResult>('/login', {
      username,
      password,
    });
  }
}
