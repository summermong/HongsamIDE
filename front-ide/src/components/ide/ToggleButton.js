/** @format */

import React, { useState } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    !isToggled ? setIsToggled(true) : setIsToggled(false);
  };
  return (
    <div className={styles.toggleButtonWraper}>
      <button
        className={
          isToggled
            ? `${styles.toggleButton} ${styles.toggleButton_dark}`
            : styles.toggleButton
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

export default ToggleButton;
