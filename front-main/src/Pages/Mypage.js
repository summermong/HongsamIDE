import React from 'react';
import Nav from '../Components/Nav';
import styles from './Mypage.module.css';
import { useAuth } from '../api/AuthContext';

const Mypage = () => {
  /* 로그인 & 유저 정보 전역관리 */
  const { userData } = useAuth();

  /* 유저 이메일 & 이름 */
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
            <div className={styles.solvingQuestion}>풀이: 5문제</div>
          </div>
          <div className={styles.userBtns}>
            <button>비밀번호 재설정</button>
            <button>탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
