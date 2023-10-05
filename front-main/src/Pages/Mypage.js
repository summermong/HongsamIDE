import React, { useEffect } from 'react';
import Nav from '../Components/Nav';
import styles from './Mypage.module.css';
import { useAuth } from '../api/AuthContext';
import axios from 'axios';

const Mypage = () => {
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

  const { isLoggedIn, userData, login, logout } = useAuth();

  const userEmail = userData?.email || '사용자 이메일 없음';
  const userName = userData?.username || '사용자 이름 없음';

  return (
    <div>
      <Nav />
      <div className={styles.Mypage}>
        <div className={styles.userInfoContainer}>
          <div className={styles.userPhoto}></div>
          <div className={styles.userInfo}>
            <div className={styles.Title}>📌 Infomation</div>
            <div className={styles.userEmail}>{userEmail}</div>
            <div className={styles.userName}>{userName}</div>
            <button className={styles.changingNameBtn}>수정</button>
          </div>
          <div className={styles.userScore}>
            <div className={styles.Title}>📖 Score</div>
            <div className={styles.solveQ}>풀이: 5문제</div>
          </div>
          <div className={styles.userBtns}>
            <button className={styles.changingPasswordBtn}>
              비밀번호 재설정
            </button>
            <button className={styles.quitBtn}>탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
