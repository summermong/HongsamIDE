/** @format */

import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from './Chat.module.css';
import axios from 'axios';

function Chat({ uuid, roomId, sender, isDarkMode }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [stompClient, setStompClient] = useState(null);

  const scrollContainerRef = useRef(null); // useRef 초기화

  useEffect(() => {
    // 렌더링 이후에 scrollContainerRef 설정
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때 실행

  // 메시지 보내기
  const sendMessage = () => {
    if (stompClient && message) {
      console.log('SEND!');
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: message,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString().slice(0, -3),
          uuid: `${uuid}`,
        }),
      });
      setMessage('');
    }
  };

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS('https://chat.hong-sam.online/ws/chat');
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket;
    stompClient.onConnect = () => {
      // 입장 메시지 전송
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'ENTER',
          roomId: `${roomId}`,
          sender: `${sender}`,
          message: null, // 이름에 따라 다른 입장 메시지
          uuid: `${uuid}`,
        }),
      });
      setStompClient(stompClient);
    };
    stompClient.activate();
    // 컴포넌트가 마운트될 때 이전 대화 내용 불러오기 (추가)
    fetchMessages();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []); // 빈 배열로 설정하여 한 번만 실행

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (frame) => {
        const receivedMessage = JSON.parse(frame.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  }, [stompClient]);

  const fetchMessages = () => {
    if (!isLoading) {
      setIsLoading(true);
      axios
        .get(`https://chat.hong-sam.online/chat/message/${roomId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const newMessages = response.data;
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={styles.Mock}>
      <div className={styles.chat} ref={scrollContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.type === 'ENTER'
                ? styles.enter
                : message.sender === `${sender}`
                ? styles.send
                : styles.receive
            }
          >
            {message.type === 'ENTER' ? (
              <div className={styles.enterMessage}>{message.message}</div>
            ) : message.sender === `${sender}` ? (
              <div className={styles.send}>
                <div className={styles.sender}>{message.sender}</div>
                <span className={styles.sendChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            ) : (
              <div className={styles.receive}>
                <div className={styles.receiver}>{message.sender}</div>
                <span className={styles.receiveChat}>{message.message}</span>
                <div className={styles.time}>{message.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <textarea
          type='text'
          placeholder='메시지를 입력해주세요.'
          value={message}
          className={` ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'}`}
          onChange={(e) => setMessage(e.target.value)}
          /**
           * 한글처럼 한 글자에 여러가지 문자가 담기는 경후 조합하는 동안에 한번 더 출력이 되는 경우가 생긴다고 한다
           */
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) {
              // isComposing 이 true 이면 조합 중이므로 동작을 막는다.
              return;
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className={`${!message.trim() ? 'bg-zinc-900' : styles.bgGreen}`}
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;
