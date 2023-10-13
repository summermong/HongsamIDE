/** @format */

import React, { useState } from 'react';
import styles from './DarkModeButton.module.css';

const DarkModeButton = ({ isDarkMode, setIsDarkMode }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    isToggled ? setIsToggled(false) : setIsToggled(true);
    isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true);
  };

  return (
    <div className={styles.DarkModeButton}>
      <button
        className={
          isToggled
            ? `${styles.toggleBtn} ${styles.toggleBtn_dark}`
            : styles.toggleBtn
        }
        onClick={toggleButton}
      >
        <span>{isToggled ? '🌙' : '☀️'}</span>
      </button>
    </div>
  );
};

export default DarkModeButton;
