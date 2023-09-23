/** @format */

import React from 'react';
import ChevronDown from '../../icon/ChevronDown';

export default function TermTopBar() {
  return (
    <div>
      <div className='flex h-3'>
        <div className='grow'></div>
        <button className='h-full p-1'>
          <ChevronDown w={'3'} h={'3'} />
        </button>
      </div>
    </div>
  );
}
