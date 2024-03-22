import React, { useRef } from 'react';
import { UserItem } from '../UserItem';

import styles from './styles.module.css';
import { User } from '@/shared/types/user';
import { ITEM_HEIGHT } from '../../lib/utils/constants';
import { usePartialListRendering } from '@/shared/hooks/usePartialListRendering';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

interface UserListProps {
  users: User[];
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectUser: (user: User) => void;
  selectedUser?: User;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  hasMore,
  selectedUser,
  onLoadMore,
  onSelectUser,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { itemsToRender, calculateVisibleItems } = usePartialListRendering(
    listRef,
    users.length,
  );

  useInfiniteScroll({
    rootRef: listRef,
    onScrollToEnd: onLoadMore,
    hasMore,
  });

  return (
    <div
      ref={listRef}
      className={styles.userList}
      onScroll={calculateVisibleItems}
      style={{ paddingRight: '0.25rem' }}
    >
      <div
        style={{
          height: `${users.length * ITEM_HEIGHT}rem`,
          position: 'relative',
        }}
      >
        {itemsToRender().map((index) => {
          const user = users[index];

          return (
            <UserItem
              key={user.id}
              user={user}
              isSelected={user.id === selectedUser?.id}
              style={{
                position: 'absolute',
                top: `${index * ITEM_HEIGHT}rem`,
                left: 0,
                right: 0,
                height: `${ITEM_HEIGHT}rem`,
              }}
              onClick={() => onSelectUser(user)}
            />
          );
        })}
      </div>
    </div>
  );
};
