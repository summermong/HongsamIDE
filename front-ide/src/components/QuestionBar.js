/** @format */

import React from 'react';

export default function QuestionBar() {
  return (
    <div className='w-1/5 h-screen bg-slate-100 border'>
      <div>
        <h1 className='text-lg p-5'>문제 제목</h1>
      </div>
      <div>
        <p className='p-5'>문제 설명</p>
      </div>
    </div>
  );
}
