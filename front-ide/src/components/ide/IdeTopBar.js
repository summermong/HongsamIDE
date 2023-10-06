/** @format */

import React from 'react';
import styles from './IdeTopBar.module.css';
import Stopwatch from './Stopwatch';
import ToggleButton from './ToggleButton';
import DarkModeButton from './DarkModeButton';

export default function IdeTopBar({ showValue, isDarkMode, setIsDarkMode }) {
  const openChat = () => {};
  return (
    <div
      className={`${styles.IdeTopBarContainer} flex items-center fixed w-screen z-10 border-b`}
    >
      <p className={`${styles.IdeTopBarHeader} text-2xl pl-5 p-2`}>
        Hongsam IDE
      </p>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <ToggleButton />
        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Stopwatch />
        <button onClick={openChat}>Chat</button>
        <button onClick={showValue}>Run</button>
      </div>
    </div>
  );
}
