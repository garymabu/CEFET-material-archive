'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuthedEffectfullMutation } from '../../hooks/useAuthedEffectfullMutation.hook';
import {
  AuthService,
  LoginDataDTO,
} from '../../integration/cefet-material-archive/auth/auth.service';
import { AuthStorage } from '../../storage/auth.storage';
import { useRouter } from 'next/navigation';

interface LoginInfo {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginInfo>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

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
    <form
      className="flex flex-col justify-between items-center"
      onSubmit={handleSubmit(handleLoginAttempt)}
    >
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <div className="w-full mt-5">
          <label className="text-sm font-semibold text-gray-600">Usuário</label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="text"
            {...register('username')}
            required
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">Senha</label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="password"
            {...register('password')}
            required
          />
        </div>
        <button
          className="w-full h-10 mt-4 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
