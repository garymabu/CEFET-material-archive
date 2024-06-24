'use client';

import { useForm } from 'react-hook-form';
import { PasswordResetStageProps } from '../page';
import { useAuthedEffectfullMutation } from '@/app/hooks/useAuthedEffectfullMutation.hook';
import { AuthService } from '@/app/integration/cefet-material-archive/auth/auth.service';

export default function CheckUserForm({
  moveToNextStage,
  onReceiveUserId,
}: {
  onReceiveUserId: (userId: string) => void;
} & PasswordResetStageProps) {
  const authService = new AuthService();
  const {
    mutate: login,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useAuthedEffectfullMutation(
    (email: string) => authService.challengeEmailIfExists(email),
    {
      onSuccess: ({ data: { userId } }) => {
        onReceiveUserId(userId);
        moveToNextStage();
      },
    },
    false
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form
      className="flex flex-col justify-between items-center"
      onSubmit={handleSubmit((data) => {
        login(data.email);
      })}
    >
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <h1 className="text-xl font-semibold text-gray-600">
          Recuperação de Senha
        </h1>
        <div className="w-full mt-5">
          <label className="text-sm font-semibold text-gray-600">
            E-mail cadastrado
          </label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="text"
            {...register('email')}
            required
          />
        </div>
        <button
          className="w-full h-10 mt-4 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Enviar e-mail de Recuperação
        </button>
      </div>
    </form>
  );
}
