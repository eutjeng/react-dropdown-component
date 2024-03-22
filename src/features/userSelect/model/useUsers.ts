import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/shared/types/user';
import { fetchUsers } from '@/api/users';
import { INITIAL_LIST_LIMIT } from '../lib/utils/constants';

export const useUsers = (
  initialPage: number = 0,
  limit: number = INITIAL_LIST_LIMIT,
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isInitialLoad = useRef(true);

  const loadUsers = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const pageNumber = page + 1;

    try {
      const fetchedUsers = (await fetchUsers(pageNumber, limit)).data;
      setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      setHasMore(fetchedUsers.length === limit);
      setPage(pageNumber);
    } catch (e) {
      setError('An error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  }, [page, limit, loading]);

  useEffect(() => {
    if (isInitialLoad.current && !loading) {
      loadUsers();
      isInitialLoad.current = false;
    }
  }, [loadUsers, loading]);

  return { users, loading, error, hasMore, loadMore: loadUsers };
};
