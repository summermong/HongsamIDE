/** @format */

import React, { useEffect, useState } from 'react';
import styles from './IdeTopBar.module.css';
import Stopwatch from './Stopwatch';
import ToggleButton from './ToggleButton';
import DarkModeButton from './DarkModeButton';
import Chat from './Chat';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function IdeTopBar({ showValue, isDarkMode, setIsDarkMode }) {
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
    <div
      className={`${styles.IdeTopBarContainer} flex items-center fixed w-screen z-10 border-b`}
    >
      <p className={`${styles.IdeTopBarHeader} text-2xl pl-5 p-2`}>
        Hongsam IDE
      </p>
      <div className='grow'></div>
      <div className='flex items-center gap-5 pr-5'>
        <ToggleButton />
        <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Stopwatch />
        <button onClick={openChat}>Chat</button>
        <button onClick={showValue}>Run</button>
      </div>
      {uuid && roomId && isChatOpen && (
        <Chat uuid={uuid} roomId={roomId} sender={sender} />
      )}
    </div>
  );
}
