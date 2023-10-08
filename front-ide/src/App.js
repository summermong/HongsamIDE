/** @format */

import './App.css';
import QuestionBar from './components/ide/QuestionBar';
import JavaCodeEditor from './components/ide/JavaCodeEditor';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Guest from './pages/Guest';

function App() {
  const [leftWidth, setLeftWidth] = useState(30); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <>
      <Routes>
        <Route
          //uuid/questionId useParams로 받아오기
          path='/:uuidParam/:questionIdParam'
          element={
            <div
              className={`flex w-full h-full ${
                isDarkMode ? 'bg-zinc-800 text-white' : ''
              } transition`}
            >
              <QuestionBar
                leftWidth={leftWidth}
                handleMouseDown={handleMouseDown}
              />
              <JavaCodeEditor
                leftWidth={leftWidth}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </div>
          }
        />
        <Route path='/:uuidParam/:questionIdParam/guest' element={<Guest />} />
      </Routes>
    </>
  );
}

export default App;
