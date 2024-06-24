'use client';

import { useRouter } from 'next/navigation';
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query';
import { redirectRoute } from './authHooks.constants';
import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { ModalLoaderContext } from '../contexts/modalLoader.context';
import { ErrorToastContext } from '../contexts/errorToast.context';

export const useAuthedEffectfullMutation = <
  TData = unknown,
  _ = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables, TContext>,
    'mutationFn'
  >,
  redirectWhenUnauthorized = true
) => {
  const { showLoader, hideLoader } = useContext(ModalLoaderContext);
  const { setCurrentError } = useContext(ErrorToastContext);
  const router = useRouter();
  const mutation = useMutation(mutationFn, options);
  useEffect(() => {
    const error = mutation.error;
    if (error?.response?.status === 401 && redirectWhenUnauthorized) {
      router.push(redirectRoute);
    }
  }, [mutation.error, router, redirectWhenUnauthorized]);
  useEffect(() => {
    const error = mutation.error;
    if (error) {
      setCurrentError(
        (mutation.error.response?.data as { message: string })?.message ||
          'An error occurred'
      );
    }
  }, [mutation.error, setCurrentError]);
  useEffect(() => {
    if (mutation.isLoading) showLoader();
    else hideLoader();
  }, [mutation.isLoading, showLoader, hideLoader]);
  return mutation;
};
