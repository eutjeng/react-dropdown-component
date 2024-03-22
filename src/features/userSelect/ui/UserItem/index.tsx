import React from 'react';

import styles from './styles.module.css';
import { User } from '@/shared/types/user';

type UserItemProps = {
  user: User;
  style?: React.CSSProperties;
  onClick: () => void;
  withIcon?: boolean;
  isSelected?: boolean;
};

export const UserItem: React.FC<UserItemProps> = ({
  user,
  withIcon = true,
  isSelected = false,
  ...props
}) => {
  const { first_name, last_name, job } = user;

  return (
    <div
      className={`${styles.userItem} ${isSelected ? styles.selected : ''}`}
      {...props}
    >
      {withIcon && <div className={styles.userIcon}>{last_name[0]}</div>}
      <span className={styles.userInfo}>
        {`${last_name} ${first_name}${job ? `, ${job}` : ''}`}
      </span>
    </div>
  );
};
