/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from './Chat';
import Stopwatch from './Stopwatch';
import styled from './IdeBottomBar.module.css';

export default function IdeBottomBar({ sender, setSender, isDarkMode }) {
  const navigate = useNavigate();
  const { uuidParam, questionIdParam } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // IDE로 리다이렉트시 url 파라미터에서 받을 내용
  const [uuid, setUuid] = useState('');

  // roomId는 uuid + questionId
  const [roomId, setRoomId] = useState('');

  // 채팅방에서 사용할 userName 받아오는 함수
  const fetchUserName = async () => {
    await axios
      .get('https://api.hong-sam.online/', { withCredentials: true })
      .then((res) => {
        if (res.data.status === 400 && sender) {
          return;
        } else if (res.data.status === 400) {
          alert(res.data.data);
          navigate(`/${uuidParam}/${questionIdParam}/guest`);
        } else if (res.data.status === 200) {
          setSender(res.data.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //IDE페이지 진입 시 url로 받아온 Params를 이용하여 RoomId와 uuid를 초기화해준다
  useEffect(() => {
    fetchUserName();
    const tmpRoomId = uuidParam + questionIdParam;
    setUuid(uuidParam);
    setRoomId(tmpRoomId);
  }, []);

  const openChat = () => {
    isChatOpen ? setIsChatOpen(false) : setIsChatOpen(true);
  };
  return (
    <>
      <div
        className={`${styled.ChatContainer} ${
          isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'
        }`}
      >
        {uuid && roomId && isChatOpen && (
          <Chat
            uuid={uuid}
            roomId={roomId}
            sender={sender}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
      <div
        className={`${
          styled.ideTopBarContainer
        } flex w-screen absolute bottom-0 border-t z-10 ${
          isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'
        }}`}
      >
        <div
          className={` ${
            isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'
          } grow`}
        ></div>
        <div className='pr-5 pt-2 pb-2'>
          <Stopwatch />
        </div>
        <button className='pr-5 pt-2 pb-2' onClick={openChat}>
          Chat
        </button>
      </div>
    </>
  );
}
