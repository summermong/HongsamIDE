/** @format */

import React, { useEffect, useState } from 'react';
import ChevronDown from '../../icon/ChevronDown';
import TermTopBar from './TermTopBar';

export default function ResultTerm({ result, topHeigth, handleMouseDown }) {
  return (
    <div
      className='overflow-y-scroll border-t'
      style={{ height: `100 - ${topHeigth}%` }}
    >
      <div
        className='w-full h-1 cursor-row-resize '
        onMouseDown={handleMouseDown}
      ></div>
      <TermTopBar />
      <div className={``}>
        <p className='pl-5'>{result}</p>
      </div>
    </div>
  );
}
