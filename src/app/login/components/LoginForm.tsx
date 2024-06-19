'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";

interface LoginInfo {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm<LoginInfo>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function handleLogin(data: LoginInfo) {
    console.log(data);
  }

  return (
    <form 
      className="flex flex-col justify-between items-center h-[40rem] w-96 p-8 bg-gray-50"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <Image 
          src='/horiz_azul.png'
          alt='books'
          width={384}
          height={640}
        />
        <div className="w-full mt-5">
          <label
            className="text-sm font-semibold text-gray-600"
          >
            Usuário
          </label>
          <input
            className="w-full h-8 border border-slate-600 rounded-sm p-2"
            type="text"
            {...register('username')}
            required
          />
        </div>
        <div className="w-full">
          <label
            className="text-sm font-semibold text-gray-600"
          >
            Senha
          </label>
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

      <Link
        href='/'
        className="text-center text-xs text-blue-500 w-3/5 cursor-pointer"
      >
        Esqueceu sua senha? Burro. Burro. Burro. Burro.
      </Link>
    </form>
  );
}