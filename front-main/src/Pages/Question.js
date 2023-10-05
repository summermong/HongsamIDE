import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Question.module.css';
import Nav from '../Components/Nav';
import axios from 'axios';
import { useAuth } from '../api/AuthContext';
import Chat from './Chat'; // Import the Chat component

const Question = () => {
  const questsPerPage = 10; // 한 페이지당 보여줄 문제 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const quests = [
    { questionId: '1', status: '미해결', title: '토끼', level: 1 },
    { questionId: '2', status: '미해결', title: '거북이', level: 2 },
    { questionId: '3', status: '미해결', title: '회의실 배정', level: 3 },
    { questionId: '4', status: '미해결', title: '회의실 배정', level: 1 },
    { questionId: '5', status: '미해결', title: '회의실 배정', level: 2 },
    { questionId: '6', status: '미해결', title: '엉금엉금', level: 3 },
    { questionId: '7', status: '미해결', title: '앙금앙금', level: 1 },
    { questionId: '8', status: '미해결', title: '앙금앙금', level: 1 },
    { questionId: '9', status: '미해결', title: '앙금앙금', level: 1 },
    { questionId: '10', status: '미해결', title: '앙금앙금', level: 1 },
    { questionId: '11', status: '미해결', title: '앙금앙금', level: 1 },
  ];

  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuest = quests.slice(indexOfFirstQuest, indexOfLastQuest);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalQuests = quests.length;
  const canGoToNextPage = indexOfLastQuest < totalQuests;

  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

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

  const goToEditor = (questionId) => {
    if (isLoggedIn) {
      axios
        .get(`https://api.hong-sam.online/question/${questionId}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            const uuid = response.data.data;
            window.location.href = `https://ide.hong-sam/question/${uuid}/${questionId}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  const [uuid, setUuid] = useState('1234'); // Initialize uuid state
  const [roomId, setRoomId] = useState(null); // Initialize roomId state

  const setUuidAndRoomId = (uuid, newRoomId) => {
    setUuid(uuid);
    setRoomId(newRoomId);
  };

  const chating = () => {
    axios
      .get(`https://chat.hong-sam.online/chat/${uuid}/1`)
      .then((response) => {
        if (response.data.status === 200) {
          const newRoomId = response.data.data;
          setUuidAndRoomId(uuid, newRoomId);
        }
      });
  };

  return (
    <div>
      <Nav />
      <div className={styles.Question}>
        <div className={styles.findingQuestion}>
          <select className={styles.selectingLevel}>
            <option>Lv.0</option>
            <option>Lv.1</option>
            <option>Lv.2</option>
          </select>
          <input
            className={styles.searchingTitle}
            placeholder="풀고 싶은 문제 제목을 검색하세요."
          />
          <button className={styles.searchingBtn}>검색</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>문제 번호</th>
                <th>상태</th>
                <th>레벨</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {currentQuest.map((question, index) => (
                <tr key={index}>
                  <td>{question.questionId}</td>
                  <td>{question.status}</td>
                  <td>{question.level}</td>
                  <td
                    className={styles.selectingQuestion}
                    onClick={() => goToEditor(question.questionId)}
                  >
                    {question.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pageButtons}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀️
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoToNextPage}
          >
            ▶️
          </button>
          <button onClick={chating}>채팅</button>
          {uuid && roomId && <Chat uuid={uuid} roomId={roomId} />}
        </div>
      </div>
    </div>
  );
};

export default Question;
