/** @format */

import React, { useState } from 'react';

export default function Guest() {
  const [guestName, setGuestName] = useState('');
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-5'>
      <h1 className=''>게스트로 입장합니다 사용하실 닉네임을 입력해주세요</h1>
      <input className='w-6/3' type='text' />
    </div>
  );
}
