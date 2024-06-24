'use client';

import Image from 'next/image';
import { AuthStorage } from '../storage/auth.storage';
import { useRouter } from 'next/navigation';

export default function NavBar({ userName }: { userName: string }) {
  const router = useRouter();
  function handleLogout() {
    AuthStorage.clear();
    router.push('/login');
  }

  return (
    <nav className="bg-sky-200 text-white p-4 border-b-2 border-solid border-sky-600">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center h-8">
          <div className="rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm bg-gray-500 text-white">
            {userName}
          </div>
          <Image src="/horiz_azul.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="flex flex-row items-center">
          <button
            className="rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm bg-red-500 text-white"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
