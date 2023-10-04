/** @format */

import React, { useState, useEffect } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleBtn = () => {
    !isToggled ? setIsToggled(true) : setIsToggled(false);
  };
  return (
    <div className={styles.ToggleButton}>
      <button
        className={
          isToggled
            ? `${styles.toggleBtn} ${styles.toggleBtn_dark}`
            : styles.toggleBtn
        }
        onClick={toggleBtn}
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

export default ToggleButton;
