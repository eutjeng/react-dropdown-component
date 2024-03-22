import React, { useRef } from 'react';
import { UserItem } from '../UserItem';
import styles from './styles.module.css';
import { User } from '@/shared/types/user';
import { ITEM_HEIGHT_IN_REM } from '../../lib/utils/constants';
import { usePartialListRendering } from '@/shared/hooks/usePartialListRendering';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

const listStyle = {
  paddingRight: '0.25rem',
};

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

  const innerContainerStyle = {
    height: `${users.length * ITEM_HEIGHT_IN_REM}rem`,
    position: 'relative' as const,
  };

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
      style={listStyle}
    >
      <div style={innerContainerStyle}>
        {itemsToRender().map((index) => {
          const user = users[index];
          const userItemStyle = {
            position: 'absolute' as const,
            top: `${index * ITEM_HEIGHT_IN_REM}rem`,
            left: 0,
            right: 0,
            height: `${ITEM_HEIGHT_IN_REM}rem`,
          };

          return (
            <UserItem
              key={user.id}
              user={user}
              isSelected={user.id === selectedUser?.id}
              style={userItemStyle}
              onClick={() => onSelectUser(user)}
            />
          );
        })}
      </div>
    </div>
  );
};
