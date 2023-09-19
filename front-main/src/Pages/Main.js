import React from 'react';
import Styles from './Main.module.css';

const Main = () => {
  const handleCheck = () => {};

  return (
    <div className={Styles.Main}>
      <div className={Styles.subtitle}>Step for Developer</div>
      <div className={Styles.title}>Hongsam IDE</div>
      <button className={Styles.btn} onClick={() => handleCheck}>
        문제 풀이 시작
      </button>
    </div>
  );
};

export default Main;
