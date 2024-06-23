'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from 'react-query';
import { redirectRoute } from './authHooks.constants';
import { useEffect } from 'react';

export const useAuthedEffectfullQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, AxiosError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const router = useRouter();
  const query = useQuery(queryKey, queryFn, options);
  useEffect(() => {
    if (query?.error?.response?.status === 401) {
      router.push(redirectRoute);
    }
  }, [query.error, router]);
  return query;
};
