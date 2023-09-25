import React from 'react';
import styles from './Chat.module.css';

const date = () => {
  let year_month_day = new Date().toISOString().slice(0, 10);
  let week = new Date().toDateString().slice(0, 3);

  return `${year_month_day} (${week})`;
};

const time = () => {
  let hour = String(new Date().getHours()).padStart(2, '0');
  let minute = String(new Date().getMinutes()).padStart(2, '0');

  return `${hour}:${minute}`;
};

const Chat = () => {
  return (
    <div className={styles.Chat}>
      <header className={styles.header}>
        <div className={styles.title}>Hongsam IDE</div>
        <div className={styles.people}>👥</div>
      </header>

      <div className={styles.chat}>
        <div className={styles.date}>{date()}</div>
        <div className={styles.user}>
          <div className={styles.user_time}>{time()}</div>
          <div className={styles.user_message}>안녕하세요</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>

        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
        <div className={styles.another}>
          <div className={styles.another_message}>안녕</div>
          <div className={styles.another_time}>{time()}</div>
        </div>
      </div>
      <input
        className={styles.message_input}
        placeholder="메세지를 입력해주세요."
      ></input>
    </div>
  );
};

export default Chat;
