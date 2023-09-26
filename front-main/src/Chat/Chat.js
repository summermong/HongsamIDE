import React, { useState, useRef, useEffect } from 'react';
import { getDate, getTime } from './ChatInfo';
import styles from './Chat.module.css';

/* 발신자에 따라 표현되는 메세지 & CSS */
const Message = ({ text, isUserMessage }) => {
  const userClass = isUserMessage ? styles.user : styles.another;
  const messageClass = styles.message;
  const timeClass = isUserMessage ? styles.user_time : styles.another_time;

  return (
    <div className={userClass}>
      <div className={messageClass}>{text}</div>
      <div className={timeClass}>{getTime()}</div>
    </div>
  );
};

const Chat = () => {
  /* 메세지 input */
  const [inputMessage, setInputMessage] = useState('');

  /* 저장된 메세지 */
  const [messages, setMessages] = useState([
    {
      text: '현실에선 개발아기인 내가 이세계에서는 개발 천재!?',
      isUserMessage: false,
    },
  ]);

  const scrollContainerRef = useRef(null);

  /* useEffect를 사용하여 최신 메시지에 포커스 및 스크롤 설정 */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /* 메세지 전송(엔터) */
  const handleInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputMessage.trim() !== '') {
        const newMessage = { text: inputMessage, isUserMessage: true };
        setInputMessage('');
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  };

  return (
    <div className={styles.Chat}>
      <header className={styles.header}>
        <div className={styles.title}>Hongsam IDE</div>
        <div className={styles.people}>👥</div>
      </header>

      <div className={styles.chat} ref={scrollContainerRef}>
        <div className={styles.date}>{getDate()}</div>
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isUserMessage={message.isUserMessage}
          />
        ))}
      </div>

      <div>
        <input
          className={styles.message_input}
          placeholder="메세지를 입력해주세요."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyUp={handleInputKeyUp}
        />
      </div>
    </div>
  );
};

export default Chat;
