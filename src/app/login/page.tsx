import Image from "next/image";
import { useForm } from "react-hook-form";

interface LoginInfo {
  username: string;
  password: string;
}

export default function Login() {

  const { register, handleSubmit, reset } = useForm<LoginInfo>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function handleLogin(data: LoginInfo) {
    console.log(data);
    reset();
  }

  return (
    <main className='flex flex-row justify-center items-center h-screen bg-gray-200'>
      <form 
        className="flex flex-col justify-center items-start h-[40rem] w-96 p-6 bg-gray-50"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <div className="w-full">
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
        </div>
        <button
          className="w-full h-8 mt-4 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Entrar
        </button>
      </form>
      <section>
        <Image 
          src='/public/group-study-2.jpg'
          alt='Group study'
          width={500}
          height={500}
        />
      </section>
    </main>
  );
}