'use client';

import { useRouter } from 'next/navigation';
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query';
import { redirectRoute } from './authHooks.constants';
import { AxiosError } from 'axios';

export const useAuthedMutation = <
  TData = unknown,
  _ = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables, TContext>,
    'mutationFn'
  >
) => {
  const router = useRouter();
  const mutation = useMutation(mutationFn, options);
  if (mutation?.error?.response?.status === 401) {
    router.push(redirectRoute);
  }
  return mutation;
};
