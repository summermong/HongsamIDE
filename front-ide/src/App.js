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
      const newRightWidth = 100 - newLeftWidth;
      setLeftWidth(newLeftWidth);
      console.log('Resizing');
      // 오른쪽 div 너비도 설정할 수 있음: setRightWidth(newRightWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      console.log('MouseUp');
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
    console.log(isResizing);
    console.log('MouseDown');
  };
  return (
    <div className='flex w-full h-full'>
      <QuestionBar leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
      <JavaCodeEditor leftWidth={leftWidth} />
    </div>
  );
}

export default App;
