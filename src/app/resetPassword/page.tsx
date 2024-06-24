'use client';

import Image from 'next/image';
import ResetPasswordForm from './components/ResetPasswordForm';
import { useEffect, useState } from 'react';
import CheckUserForm from './components/CheckUserForm';
import ChallengeForm from './components/ChallengeForm';
import { AuthResult } from '../integration/cefet-material-archive/auth/auth.service';
import { AuthStorage } from '../storage/auth.storage';
import { useRouter } from 'next/navigation';
import { ErrorToastProvider } from '../components/ErrorToastProvider';

enum ReAuthStage {
  Email,
  ConfirmEmail,
  Password,
  Redirect,
}

export interface PasswordResetStageProps {
  moveToNextStage: () => void;
}

export default function ResetPassword() {
  const router = useRouter();
  const [stage, setStage] = useState<ReAuthStage>(ReAuthStage.Email);
  const [authData, setAuthData] = useState<AuthResult>();
  const [userId, setUserId] = useState<string>();
  const generateMoveToNextStageFn = (currentStage: number) => () => {
    setStage((prev) => currentStage);
  };

  useEffect(() => {
    if (authData) AuthStorage.set(authData);
  }, [authData]);
  useEffect(() => {
    if (stage === ReAuthStage.Redirect) {
      router.push('/dashboard');
    }
  }, [stage, router]);

  return (
    <ErrorToastProvider>
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
            {stage === ReAuthStage.Email && (
              <CheckUserForm
                onReceiveUserId={setUserId}
                moveToNextStage={generateMoveToNextStageFn(
                  ReAuthStage.ConfirmEmail
                )}
              />
            )}
            {stage === ReAuthStage.ConfirmEmail && (
              <ChallengeForm
                moveToNextStage={generateMoveToNextStageFn(
                  ReAuthStage.Password
                )}
                onReceiveAuthData={setAuthData}
                userId={userId}
              />
            )}
            {stage === ReAuthStage.Password && (
              <ResetPasswordForm
                moveToNextStage={generateMoveToNextStageFn(
                  ReAuthStage.Redirect
                )}
              />
            )}
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
    </ErrorToastProvider>
  );
}
