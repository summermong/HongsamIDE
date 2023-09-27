// DarkModeToggle.js

import React, { useState, useEffect } from 'react';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const [isToggled, setIsToggled] = useState(isDarkMode);

  // 토글 버튼 클릭 시 위치 변경 및 로컬 스토리지에 설정 저장
  const toggleButton = () => {
    const newMode = !isToggled;
    setIsToggled(newMode);
    localStorage.setItem('darkMode', newMode.toString()); // 설정을 로컬 스토리지에 저장
    setIsDarkMode(newMode); // isDarkMode 상태를 업데이트
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
        <div
          className={
            isToggled
              ? `${styles.toggleSwitch} ${styles.moveRight}`
              : styles.toggleSwitch
          }
        ></div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
