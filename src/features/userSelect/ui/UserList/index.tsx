import React from 'react';
import { UserItem } from '../UserItem';
import { User } from '@/shared/types/user';
import styles from './styles.module.css';
import { VirtualList } from '@/lib/VirtualList';
import { BUFFER_ITEMS, ITEM_HEIGHT_IN_REM } from '../../lib/utils/constants';

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
  const renderItem = (user: User, style: React.CSSProperties) => {
    if (!user) return null;

    return (
      <UserItem
        key={user.id}
        user={user}
        style={style}
        isSelected={user.id === selectedUser?.id}
        onClick={() => onSelectUser(user)}
        withIcon
      />
    );
  };

  return (
    <VirtualList
      className={styles.userList}
      items={users}
      renderItem={renderItem}
      itemHeightInRem={ITEM_HEIGHT_IN_REM}
      bufferItems={BUFFER_ITEMS}
      onLoadMore={onLoadMore}
      hasMore={hasMore}
    />
  );
};
