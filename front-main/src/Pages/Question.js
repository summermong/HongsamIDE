import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Question.module.css';
import Nav from '../Components/Nav';
import axios from 'axios';
import { useAuth } from '../api/AuthContext';
import Chat from './Chat';
import QuestionContainer from '../Components/QuestionContainer';
import QuestionPageBtn from '../Components/QuestionPageBtn';

const Question = () => {
  const navigate = useNavigate();

  const { isLoggedIn, userData } = useAuth();
  const [sender, setSender] = useState('');

  /* IDE로 이동하는 함수 */
  const goToEditor = (questionId) => {
    /* 로그인 시 uuid와 questionId를 가지고 이동 */
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
      /* 미로그인 시 로그인 페이지로 이동 */
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  /* web ide에 필요 */
  const [uuid, setUuid] = useState('1234');
  /* web ide에 필요 */
  const [roomId, setRoomId] = useState('12341');
  /* web ide에 필요 */
  const [isChatOpen, setIsChatOpen] = useState(false);
  /* web ide에 필요 */
  const openChat = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      navigate('/login');
    } else {
      setSender(userData.username);
      setIsChatOpen(true);
    }
  };

  /* 레벨 선택 상태 */
  const [selectedLevel, setSelectedLevel] = useState('all');

  /* 레벨 선택 이벤트 핸들러 */
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  /* 레벨 선택 옵션 */
  const levelOptions = ['all', 'Lv.0', 'Lv.1', 'Lv.2'];

  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.hong-sam.online/question')
      .then((response) => {
        setQuestionData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* 레벨에 따라 필터된 문제 배열 생성 */
  const filteredQuests =
    selectedLevel === 'all'
      ? questionData
      : questionData.filter(
          (question) =>
            parseInt(question.level) === parseInt(selectedLevel.slice(3))
        );

  /* 페이지 당 문제 개수 */
  const questsPerPage = 10;

  /* 현재 페이지의 기본값 */
  const [currentPage, setCurrentPage] = useState(1);

  /* 페이지의 마지막 문제 인덱스 */
  const indexOfLastQuest = currentPage * questsPerPage;

  /* 페이지의 첫 번째 문제 인덱스 */
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;

  /* 한 페이지 당 들어갈 문제의 개수 */
  const currentQuest = filteredQuests.slice(
    indexOfFirstQuest,
    indexOfLastQuest
  );

  /* 현재 페이지 상태 변경 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /* 페이지의 마지막 문제 인덱스가 전체 문제 개수보다 작을 경우 다음 페이지로 이동 가능 */
  const totalQuests = questionData.length;
  const canGoToNextPage = indexOfLastQuest < totalQuests;

  return (
    <div>
      <Nav />
      <div className={styles.Question}>
        <div className={styles.findingQuestion}>
          <select
            className={styles.selectingLevel}
            onChange={handleLevelChange}
            value={selectedLevel}
          >
            {levelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option === 'all' ? '전체' : `${option}`}
              </option>
            ))}
          </select>
          <input
            className={styles.searchingTitle}
            placeholder="풀고 싶은 문제 제목을 검색하세요."
          />
          <button className={styles.searchingBtn}>검색</button>
        </div>
        <QuestionContainer
          currentQuest={currentQuest}
          goToEditor={goToEditor}
        />
        <QuestionPageBtn
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          canGoToNextPage={canGoToNextPage}
        />
        <button onClick={openChat}>채팅</button> {/* web ide에 필요 */}
        {uuid && roomId && isChatOpen && (
          <Chat uuid={uuid} roomId={roomId} sender={sender} />
        )}
      </div>
    </div>
  );
};

export default Question;
