/** @format */

import React from 'react';
import Play from '../icon/Play';

export default function IdeTopBar({ showValue }) {
  return (
    <div className='flex items-center border fixed w-screen z-10 bg-white'>
      <p style={{ color: 'var(--main-color)' }} className='text-2xl pl-3'>
        HongSamIDE
      </p>
      <div className='grow'></div>
      <button
        onClick={showValue}
        style={{ width: '40px', height: '40px' }}
        className=''
      >
        <Play color={'var(--main-color)'} />
      </button>
    </div>
  );
}
