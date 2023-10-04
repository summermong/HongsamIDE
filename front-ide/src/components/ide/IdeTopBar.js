/** @format */

import React from 'react';
import Play from '../../icon/Play';
import Stopwatch from './Stopwatch';
import ToggleButton from './ToggleButton';
import DarkModeButton from './DarkModeButton';

export default function IdeTopBar({ showValue, isDarkMode, setIsDarkMode }) {
  return (
    <div className='flex items-center fixed w-screen z-10 border-b'>
      <p style={{ color: 'var(--main-color)' }} className='text-2xl pl-5 p-2'>
        HongSamIDE
      </p>
      <div className='grow'></div>
      <div className='flex items-center gap-4'>
        <ToggleButton />
        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Stopwatch />
        <button onClick={showValue} style={{ width: '40px', height: '40px' }}>
          <Play color={'var(--main-color)'} />
        </button>
      </div>
    </div>
  );
}
