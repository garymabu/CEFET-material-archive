'use client';

import Image from 'next/image';
import Link from 'next/link';
import ResetPasswordForm from './components/ResetPasswordForm';
import { useState } from 'react';
import CheckUserForm from './components/CheckUserForm';

enum ReAuthStage {
  Email,
  ConfirmEmail,
  Password,
}

export interface PasswordResetStageProps {
  moveToNextStage: () => void;
}

export default function ResetPassword() {
  const [stage, setStage] = useState<ReAuthStage>(ReAuthStage.Email);
  const moveToNextStage = () => {
    setStage((prev) => prev + 1);
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
          {stage === ReAuthStage.Email && <CheckUserForm />}
          {stage === ReAuthStage.ConfirmEmail && <ResetPasswordForm />}
        </div>
        <div className="flex items-end h-1/5"></div>
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
