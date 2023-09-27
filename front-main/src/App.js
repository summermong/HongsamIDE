import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Question from './Pages/Question';
import Chat from './Chat/Chat';
import { AuthProvider } from './api/AuthContext';
import DarkModeToggle from './Components/DarkModeToggle';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 페이지 로드 시 로컬 스토리지에서 다크 모드 설정 불러오기
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true'); // 문자열을 불리언 값으로 변환
    }
  }, []);

  // body의 배경색을 설정
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isDarkMode]); // isDarkMode가 변경될 때만 실행

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <DarkModeToggle
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/question" element={<Question />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
