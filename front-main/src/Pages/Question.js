import Container from '../components/Container';
import NavBar from '../components/NavBar';
import styles from './Question.module.css';

const Home = () => {
  const containers = [
    [
      { containerId: '1', title: '토끼' },
      { containerId: '2', title: '거북이' },
      { containerId: '3', title: '회의실 배정' },
      { containerId: '4', title: '회의실 배정' },
      { containerId: '5', title: '회의실 배정' },
      { containerId: '6', title: '엉금엉금' },
      { containerId: '7', title: '앙금앙금' },
    ],
  ];

  return (
    <div className={styles.Home}>
      <NavBar />
      <div className={styles.Content}>
        <div className={styles.title}>문제 목록</div>
        {containers.map((container) => (
          <Container key={container[0].containerId} data={container} />
        ))}
      </div>
    </div>
  );
};

export default Home;
