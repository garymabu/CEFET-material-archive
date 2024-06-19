import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <main className='flex flex-row justify-center items-center h-screen bg-gray-200'>
      <LoginForm />
      <Image 
        src='/Literature-Education.webp'
        alt='books'
        width={384}
        height={640}
      />
    </main>
  );
}