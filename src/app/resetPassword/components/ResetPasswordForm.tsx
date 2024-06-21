'use client';

import { useForm } from 'react-hook-form';
import { PasswordResetStageProps } from '../page';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';
import { UserService } from '@/app/integration/cefet-material-archive/user/user.service';
import { AuthStorage } from '@/app/storage/auth.storage';

export default function ResetPasswordForm({
  moveToNextStage,
}: PasswordResetStageProps) {
  const userService = new UserService();
  const {
    mutate: applyPasswordChange,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useAuthedMutation(
    (newPassword: string) =>
      userService.changePassword(AuthStorage.get().userId, newPassword),
    {
      onSuccess: ({}) => {
        moveToNextStage();
      },
    }
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form
      className="flex flex-col justify-between items-center"
      onSubmit={handleSubmit((data) => {
        if (data.password !== data.confirmPassword) {
          alert('As senhas não coincidem');
          return;
        }
        applyPasswordChange(data.password);
      })}
    >
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <div className="w-full mt-5">
          <label className="text-sm font-semibold text-gray-600">Senha</label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="text"
            {...register('password')}
            required
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold text-gray-600">
            Confirme a senha
          </label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="password"
            {...register('confirmPassword')}
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
