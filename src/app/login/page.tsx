'use client';

import Image from 'next/image';
import LoginForm from './components/LoginForm';
import Link from 'next/link';
import { useAuthedEffectfullMutation } from '../hooks/useAuthedEffectfullMutation.hook';
import {
  AuthService,
  LoginDataDTO,
} from '../integration/cefet-material-archive/auth/auth.service';
import { AuthStorage } from '../storage/auth.storage';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const authService = new AuthService();
  const {
    mutate: login,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useAuthedEffectfullMutation(
    (authData: LoginDataDTO) => authService.login(authData),
    {
      onSuccess: ({ data }) => {
        AuthStorage.set({
          bearerToken: data.bearerToken,
          userType: data.userType,
          userId: data.userId,
        });
        router.push('/dashboard');
      },
    }
  );

  const handleLoginAttempt = (data: LoginDataDTO) => {
    login(data);
  };

  return (
    <main className="flex flex-row justify-center items-center h-screen bg-gray-200">
      <section className="relative flex flex-col justify-between items-center h-[40rem] w-96 p-8 bg-gray-50">
        <Image
          className="h-1/5"
          src="/horiz_azul.png"
          alt="books"
          width={384}
          height={640}
        />
        <div className="h-3/5">
          <LoginForm onLogin={handleLoginAttempt} />
        </div>
        <div className="flex items-end h-1/5 justify-center">
          <Link
            href="/resetPassword"
            className="text-xs text-blue-500 w-full cursor-pointer"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </section>
      <Image
        src="/Literature-Education.webp"
        alt="books"
        width={384}
        height={640}
      />
    </main>
  );
}
