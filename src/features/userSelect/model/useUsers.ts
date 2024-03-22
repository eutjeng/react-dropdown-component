import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/shared/types/user';
import { fetchUsers } from '@/api/users';

export const useUsers = (initialPage: number = 0, limit: number = 50) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isInitialLoad = useRef(true); // Ref to track the initial load

  const loadUsers = useCallback(async () => {
    if (loading) return; // Prevent loading if already in progress
    setLoading(true);
    const pageNumber = page + 1;

    try {
      const fetchedUsers = (await fetchUsers(pageNumber, limit)).data;
      setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      setHasMore(fetchedUsers.length === limit);
      setPage(pageNumber); // Adjust based on the fetched data
    } catch (e) {
      setError('An error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  }, [page, limit, loading]);

  useEffect(() => {
    // Use the isInitialLoad ref to ensure loadUsers is called only once on mount
    if (isInitialLoad.current && !loading) {
      loadUsers();
      isInitialLoad.current = false; // Update ref after initial load
    }
  }, [loadUsers, loading]); // Depend on loading to prevent multiple calls

  return { users, loading, error, hasMore, loadMore: loadUsers };
};
