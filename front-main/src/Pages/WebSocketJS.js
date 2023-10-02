import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function WebSocketJS() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [name, setName] = useState(''); // 이름 상태 추가

  const roomId = '9c79c435-3364-4d69-ae2a-99979bcede61';

  // 메시지 보내기
  const sendMessage = () => {
    if (stompClient && message) {
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${roomId}`,
          sender: name, // 현재 설정된 이름 사용
          message: message,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        }),
      });
      setMessage('');
    }
  };

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS('https://api.hong-sam.online/ws/chat'); // WebSocket 연결 URL 지정
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket;
    stompClient.onConnect = () => {
      console.log('안녕'); // 연결이 성공하면 콘솔에 "안녕" 출력

      // 이름 입력 받기
      const enteredName = window.prompt('이름을 입력하세요');
      setName(enteredName || '사용자 이름'); // 이름 설정, 입력이 없을 경우 기본값 설정

      // 입장 메시지 전송
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'ENTER',
          roomId: `${roomId}`,
          sender: `${enteredName}`,
          message: null, // 이름에 따라 다른 입장 메시지
        }),
      });
      setStompClient(stompClient);
    };
    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []); // 빈 배열로 설정하여 한 번만 실행

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (frame) => {
        console.log('안녕!');
        const receivedMessage = JSON.parse(frame.body);
        console.log(receivedMessage); // 확인용 로그
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  }, [stompClient]);

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index}>
            {message.type === 'ENTER'
              ? message.message
              : `${message.sender}: ${message.message}`}
            {message.date}
            {message.time}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default WebSocketJS;
