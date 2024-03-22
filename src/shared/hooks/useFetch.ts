import { useCallback, useEffect, useRef, useState } from 'react';
import { INITIAL_PAGE_NUMBER } from '../utils/constants';

export const useFetch = <T>(
  fetchFunction: (page: number, limit: number) => Promise<T[]>,
  initialPage: number = INITIAL_PAGE_NUMBER,
  limit: number,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isInitialLoad = useRef<boolean>(true);

  const loadMore = useCallback(async () => {
    setLoading(true);

    const pageNumber = page + 1;

    try {
      const fetchedData = await fetchFunction(pageNumber, limit);

      setData((prevData) => [...prevData, ...fetchedData]);
      setHasMore(fetchedData.length === limit);
      setPage(pageNumber);
    } catch (e) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, limit]);

  useEffect(() => {
    if (isInitialLoad.current && !loading) {
      loadMore();

      isInitialLoad.current = false;
    }
  }, [loadMore, loading]);

  return { data, loading, error, hasMore, loadMore };
};
