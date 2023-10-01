/** @format */

import './App.css';
import QuestionBar from './components/ide/QuestionBar';
import JavaCodeEditor from './components/ide/JavaCodeEditor';
import { useEffect, useState } from 'react';

function App() {
  const [leftWidth, setLeftWidth] = useState(30); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      if (!isResizing) return;
      const totalWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / totalWidth) * 100;
      // const newRightWidth = 100 - newLeftWidth; 필요 시에 사용할 오른쪽 넓이
      setLeftWidth(newLeftWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };
  return (
    <div className='flex w-full h-full'>
      <QuestionBar leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
      <JavaCodeEditor leftWidth={leftWidth} />
    </div>
  );
}

export default App;
