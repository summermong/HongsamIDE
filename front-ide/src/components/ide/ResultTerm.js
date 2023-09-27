/** @format */

import React, { useEffect, useState } from 'react';
import ChevronDown from '../../icon/ChevronDown';
import TermTopBar from './TermTopBar';

export default function ResultTerm({ result }) {
  const [height, setHeight] = useState(200);
  const [heightMouseDown, setheightMouseDown] = useState(false);
  const mouseDownTermBorder = (e) => {
    e.preventDefault();
    setheightMouseDown(true);
    console.log(heightMouseDown);
  };
  const mouseUpTermBorder = (e) => {
    e.preventDefault();
    setheightMouseDown(false);
    console.log(heightMouseDown);
  };
  const mouseMoveTermBorder = (e) => {
    e.preventDefault();
    if (heightMouseDown) {
      console.log('옮겨진다아');
    } else {
      console.log('nobe');
    }
  };
  const hideTerm = (e) => {
    e.preventDefault();
    setHeight(0);
  };
  return (
    <div className=' overflow-y-scroll'>
      <TermTopBar />
      <div className={``}>
        <p className='pl-2'>{result}</p>
      </div>
    </div>
  );
}
