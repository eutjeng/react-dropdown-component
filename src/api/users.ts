import { INITIAL_LIST_LIMIT } from '@/features/userSelect/lib/utils/constants';
import { UserResponse } from '@/shared/types/user';
import { API_URL } from '@/shared/utils/constants';

export const fetchUsers = async (
  page: number,
  limit: number = INITIAL_LIST_LIMIT,
): Promise<UserResponse> => {
  const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`);

  if (!response.ok) throw new Error('Failed to fetch users');

  return response.json();
};
