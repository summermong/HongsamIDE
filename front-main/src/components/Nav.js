import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuth } from '../api/AuthContext';
import axios from 'axios';

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, login, logout } = useAuth();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = isLoggedIn ? `${userData.username} 님` : '로그인';

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToLogout = () => {
    axios
      .post(
        'https://api.hong-sam.online/members/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          logout();
          alert('로그아웃 되었습니다.');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // 세션 체크를 위한 GET 요청
    axios
      .get('https://api.hong-sam.online/', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          login(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.Nav}>
      <header className={styles.header}>
        <div className={styles.title}>Hongsam IDE</div>
        <button
          className={styles.username}
          onClick={isLoggedIn ? toggleDropdown : goToLogin}
        >
          {userName}
          {isLoggedIn && isDropdownOpen && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <ul>
                <li onClick={goToMypage}>My Page</li>
                <li onClick={goToLogout}>로그아웃</li>
              </ul>
            </div>
          )}
        </button>
      </header>
    </div>
  );
};

export default Nav;
