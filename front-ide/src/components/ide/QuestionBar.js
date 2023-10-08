/** @format */

import React, { useEffect, useState } from 'react';
import styles from './QuestionBar.module.css';
import axios from 'axios';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function QuestionBar({ leftWidth, handleMouseDown }) {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [questionOutput, setQuestionOutput] = useState('');

  const textFileUrl =
    'https://web-ide.s3.ap-northeast-2.amazonaws.com/admin/q1'; // 텍스트 파일의 URL을 여기에 입력

  const fetchQuestion = async (subUrl, setState) => {
    await axios
      .get(`${textFileUrl}/${subUrl}`)
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchQuestion('content.md', setQuestionContent);
    fetchQuestion('title.md', setQuestionTitle);
    fetchQuestion('questionInput.md', setQuestionInput);
    fetchQuestion('questionOutput.md', setQuestionOutput);
  }, []);

  return (
    <div
      style={{
        width: `${leftWidth}%`,
      }}
      className={`${styles.questionBarContainer} overflow-y-scroll relative border-r`}
    >
      <div
        className='absolute right-0 h-full w-2 cursor-col-resize'
        onMouseDown={handleMouseDown}
      ></div>
      <div>
        <div className={`${styles.questionItem} text-3xl p-5 border-b`}>
          <ReactMarkDown remarkPlugins={[remarkGfm]}>
            {questionTitle}
          </ReactMarkDown>
        </div>
      </div>
      <div className={`${styles.questionItem} p-5 border-b`}>
        <ReactMarkDown remarkPlugins={[remarkGfm]}>
          {questionContent}
        </ReactMarkDown>
      </div>
      <div className={`${styles.questionItem} p-5 border-b`}>
        <p className='text-lg'>입력</p>
        <ReactMarkDown remarkPlugins={[remarkGfm]}>
          {questionInput}
        </ReactMarkDown>
      </div>
      <div className={`${styles.questionItem} p-5 border-b`}>
        <p className='text-lg'>출력</p>
        <ReactMarkDown remarkPlugins={[remarkGfm]}>
          {questionOutput}
        </ReactMarkDown>
      </div>
    </div>
  );
}
