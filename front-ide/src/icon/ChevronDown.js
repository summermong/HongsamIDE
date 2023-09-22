/** @format */

import React from 'react';

export default function ChevronDown({ w, h }) {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-${w} h-${h}`}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 8.25l-7.5 7.5-7.5-7.5'
        />
      </svg>
    </div>
  );
}
