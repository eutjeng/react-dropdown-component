import React, { useState, useEffect } from 'react';
import { UserList } from '../UserList';
import styles from './styles.module.css';
import { useUsers } from '@/features/userSelect/model/useUsers';
import { User } from '@/shared/types/user';

const expandedWidth = '22.5rem';
const collapsedWidth = '15.625rem';

export const UserSelectDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users, hasMore, loadMore } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  return (
    <div
      className={styles.dropdownContainer}
      style={{ width: isOpen ? expandedWidth : collapsedWidth }}
    >
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.active : ''}`}
        onClick={handleToggleDropdown}
      >
        <span className={styles.dropdownCaret}>
          {selectedUser
            ? `${selectedUser.last_name} ${selectedUser.first_name}, ${selectedUser.job}`
            : 'Loading users...'}
        </span>
      </button>
      {isOpen && (
        <UserList
          users={users}
          onSelectUser={handleSelectUser}
          hasMore={hasMore}
          onLoadMore={loadMore}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
