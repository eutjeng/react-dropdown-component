import React from 'react';
import styles from './styles.module.css';
import { HomePage } from '@/pages/HomePage';

const App: React.FC = () => {
  return (
    <div>
      <header className={styles.appHeader}>User Select Dropdown</header>
      <main className={styles.app}>
        <HomePage />
      </main>
    </div>
  );
};

export default App;
