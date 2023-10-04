import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuth } from '../api/AuthContext';

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, logout } = useAuth();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = isLoggedIn ? `${userData.name} 님` : '로그인';

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
                <li onClick={logout}>로그아웃</li>
              </ul>
            </div>
          )}
        </button>
      </header>
    </div>
  );
};

export default Nav;
