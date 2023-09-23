/** @format */

import React from 'react';

export default function QuestionBar() {
  return (
    <div
      style={{ height: 'calc(100vh - 42px)', marginTop: '42px' }}
      className=' w-2/6 border overflow-y-scroll'
    >
      <div>
        <h1 className='text-lg p-5'>넷이 놀기</h1>
      </div>
      <div>
        <p className='p-5'>
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
      <div className='p-5'>
        <p>입력</p>
        <p></p>
      </div>
      <div className='p-5'>
        <p>출력</p>
        <p></p>
      </div>
    </div>
  );
}
