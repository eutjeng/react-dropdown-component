import React, { useState, useEffect } from 'react';
import { UserList } from '../UserList';
import styles from './styles.module.css';
import { useUsers } from '@/features/userSelect/model/useUsers';
import { User } from '@/shared/types/user';

export const UserSelectDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users, hasMore, loadMore } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div
      className={styles.dropdownContainer}
      style={{ width: isOpen ? '22.5rem' : '15.625rem' }}
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
