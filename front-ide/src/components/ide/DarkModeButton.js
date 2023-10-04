/** @format */

import React, { useState, useEffect } from 'react';
import styles from './DarkModeButton.module.css';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    isToggled ? setIsToggled(false) : setIsToggled(true);
    isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true);
    console.log(isDarkMode);
  };

  return (
    <div className={styles.DarkModeToggle}>
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

export default DarkModeToggle;
