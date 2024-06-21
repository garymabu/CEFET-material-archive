import Image from 'next/image';
import LoginForm from './components/LoginForm';
import Link from 'next/link';

export default function Login() {
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
          <LoginForm />
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
