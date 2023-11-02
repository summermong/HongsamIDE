/** @format */

import React from 'react';
import styles from './ResultTerm.module.css';

import TermTopBar from './TermTopBar';

export default function ResultTerm({ result, topHeigth, handleMouseDown }) {
  return (
    <div
      className={`${styles.resultTermContainer} border-t`}
      style={{
        maxHeight: `calc(100% - ${topHeigth}%)`,
      }}
    >
      <div
        className='w-full h-1 cursor-row-resize '
        onMouseDown={handleMouseDown}
      ></div>
      <TermTopBar />
      <div>
        <p className='pl-5 whitespace-pre-line'>
          {result.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
