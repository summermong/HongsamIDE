/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from './Chat';
import Stopwatch from './Stopwatch';
import styled from './IdeBottomBar.module.css';

export default function IdeBottomBar({ isDarkMode }) {
  const navigate = useNavigate();
  const { uuidParam, questionIdParam } = useParams();
  console.log(uuidParam, questionIdParam);
  const [isChatOpen, setIsChatOpen] = useState(false);

  /** IDE로 리다이렉트시 url 파라미터에서 받을 내용 */
  const [uuid, setUuid] = useState('');
  //roomId는 uuid + questionId
  const [roomId, setRoomId] = useState('');

  const [sender, setSender] = useState('');
  const fetchUserName = async () => {
    await axios
      .get('https://api.hong-sam.online/', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 400) {
          alert(res.data.data);
          navigate('/guest');
        }
        setSender(res.data.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserName();
    const tmpRoomId = uuidParam + questionIdParam;
    setUuid(uuidParam);
    setRoomId(tmpRoomId);
  }, []);

  const openChat = () => {
    isChatOpen ? setIsChatOpen(false) : setIsChatOpen(true);
    console.log('topBarUUID : ', uuid);
    console.log('topBarROOMID : ', roomId);
    console.log('topBarSENDER : ', sender);
  };
  return (
    <>
      <div className={`${styled.ChatContainer} bg-black fixed`}>
        {uuid && roomId && isChatOpen && (
          <Chat uuid={uuid} roomId={roomId} sender={sender} />
        )}
      </div>
      <div
        className={`flex w-screen absolute bottom-0 border-t ${
          isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white'
        } transition}`}
      >
        <div className='grow'></div>
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
