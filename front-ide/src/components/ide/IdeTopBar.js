/** @format */

import React, { useEffect, useState } from 'react';
import styles from './IdeTopBar.module.css';
import Stopwatch from './Stopwatch';
import ToggleButton from './ToggleButton';
import DarkModeButton from './DarkModeButton';
import Chat from './Chat';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function IdeTopBar({
  compileCode,
  fetchCode,
  saveCode,
  isDarkMode,
  setIsDarkMode,
}) {
  const currentUrl = window.location.href;

  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('URL이 복사되었습니다.');
      })
      .catch((error) => {
        console.error('URL 복사 중 오류 발생:', error);
        alert('URL을 복사하는 중 오류가 발생했습니다.');
      });
  };

  return (
    <div
      className={`${styles.IdeTopBarContainer} flex items-center fixed w-screen z-10 border-b`}
    >
      <a href='https://main.hong-sam.online/question'>
        <p className={`${styles.IdeTopBarHeader} text-2xl pl-5 p-2`}>
          Hongsam IDE
        </p>
      </a>
      <div className='ml-5'>
        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <button onClick={copyUrlToClipboard}>Share</button>
        {/* <ToggleButton /> */}
        <button onClick={saveCode}>Save</button>
        <button onClick={fetchCode}>Pull</button>
        <button onClick={compileCode}>Run</button>
      </div>
    </div>
  );
}
