import { fetchUsers } from '@/api/users';
import { useFetch } from '@/shared/hooks/useFetch';
import { User } from '@/shared/types/user';
import { useCallback } from 'react';
import {
  INITIAL_LIST_LIMIT,
  INITIAL_PAGE_NUMBER,
} from '../lib/utils/constants';

type UseUsers = (
  initialPage?: number,
  limit?: number,
) => {
  users: User[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
};

export const useUsers: UseUsers = (
  initialPage = INITIAL_PAGE_NUMBER,
  limit = INITIAL_LIST_LIMIT,
) => {
  const fetchFunction = useCallback((page: number, limit: number) => {
    return fetchUsers(page, limit).then((response) => response.data);
  }, []);

  const { data, loading, error, hasMore, loadMore } = useFetch<User>(
    fetchFunction,
    initialPage,
    limit,
  );

  return { users: data, loading, error, hasMore, loadMore };
};
