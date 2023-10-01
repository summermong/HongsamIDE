/** @format */

import React, { useEffect, useState } from 'react';
import ChevronDown from '../../icon/ChevronDown';
import TermTopBar from './TermTopBar';

export default function ResultTerm({ result, topHeigth, handleMouseDown }) {
  return (
    <div
      className='overflow-y-scroll'
      style={{ height: `100 - ${topHeigth}%` }}
    >
      <div
        className='w-full bg-slate-100 h-2 cursor-row-resize'
        onMouseDown={handleMouseDown}
      ></div>
      <TermTopBar />
      <div className={``}>
        <p className='pl-2'>{result}</p>
      </div>
    </div>
  );
}
