/** @format */

import React, { useEffect, useState } from 'react';

export default function QuestionBar({ leftWidth, handleMouseDown }) {
  return (
    <div
      style={{
        width: `${leftWidth}%`,
        flexShrink: 0,
        userSelect: 'none',
        marginTop: '42px',
        height: 'calc(100vh - 42px)',
      }}
      className='border overflow-y-scroll relative'
    >
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '10px',
          height: '100%',
          backgroundColor: 'gray',
          cursor: 'col-resize',
        }}
      ></div> */}
      <div
        className='absolute right-0 h-full bg-slate-100 w-2 cursor-col-resize'
        onMouseDown={handleMouseDown}
      ></div>
      <div>
        <h1 className='text-3xl p-5 border-b-2 border-double'>넷이 놀기</h1>
      </div>
      <div>
        <p className='p-5 border-b-2'>
          네 사람이서 2차원 평면상의 N개의 점을 이용해서 할 수 있는 놀이가 있다.
          <br />
          바로 각 사람이 1개씩의 점을 적절히 선택해서 변이 x축 혹은 y축에 평행한
          직사각형을 만드는 일이다.
          <br />
          물론 그냥 만들면 재미가 없기 때문에 가로의 길이가 A 세로의 길이가 B인
          직사각형을 몇 가지나 만들 수 있는지 알아보기로 했다.
          <br />
          예를 들어 점이 A(0, 0), B(2, 0), C(0, 3), D(2, 3), E(4, 0), F(4, 3)의
          6개가 있고, 만들고 싶은 직사각형이 가로가 2, 세로가 3인 직사각형이라면
          (A, B, C, D), (B, D, E, F)의 두 가지 경우가 가능하다. 모든 경우의 수를
          구해보자.
        </p>
      </div>
      <div className='p-5 border-b-2'>
        <p className='text-lg'>입력</p>
        <p></p>
      </div>
      <div className='p-5 border-b-2'>
        <p className='text-lg'>출력</p>
        <p></p>
      </div>
    </div>
  );
}
