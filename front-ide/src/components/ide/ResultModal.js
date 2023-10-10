/** @format */

import React, { useEffect, useState } from 'react';
import styled from './ResultModal.module.css';

export default function ResultModal({
  result,
  setResultModalView,
  isDarkMode,
}) {
  const closeModal = () => {
    setResultModalView(false);
  };
  return (
    <div
      className={`${styled.modalContainer} ${
        isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'
      } rounded-md absolute w-96 h-60 border z-10 p-3`}
    >
      <div className='w-full'>
        <button
          onClick={closeModal}
          className='p-1 w-5 h-5 rounded-md flex items-center justify-center float-right'
        >
          ❌
        </button>
      </div>

      <div className=' h-full flex items-center justify-end flex-col'>
        <p className='text-3xl mb-7'>
          {result === '틀렸습니다.' ? '틀렸어요!😭' : '맞았어요!😆'}
        </p>
        <button className={`${styled.modalButton} mt-10 p-2 rounded-md`}>
          <a href='https://main.hong-sam.online/question'>다른 문제 풀러가기</a>
        </button>
      </div>
      <div></div>
    </div>
  );
}
