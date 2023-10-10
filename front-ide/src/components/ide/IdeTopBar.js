/** @format */

import React, { useEffect, useState } from 'react';
import styles from './IdeTopBar.module.css';
import Stopwatch from './Stopwatch';
import ToggleButton from './ToggleButton';
import DarkModeButton from './DarkModeButton';
import Chat from './Chat';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function IdeTopBar({ showValue, isDarkMode, setIsDarkMode }) {
  return (
    <div
      className={`${styles.IdeTopBarContainer} flex items-center fixed w-screen z-10 border-b`}
    >
      <p className={`${styles.IdeTopBarHeader} text-2xl pl-5 p-2`}>
        Hongsam IDE
      </p>
      <div className='ml-5'>
        <Stopwatch />
      </div>
      <div className='ml-4'>
        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <ToggleButton />

        <button onClick={showValue}>Run</button>
      </div>
    </div>
  );
}
