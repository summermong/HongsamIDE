import styles from "./Container.module.css";
import { containerExecute } from "../assets";

const Container = ({ data }) => {
  const handleButtonClick = (containerId) => {
    console.log("해당 컨테이너 ID: " + containerId);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.problemList}>
        {data.map((problem) => (
          <div key={problem.containerId} className={styles.problem}>
            <span className={styles.title}>{problem.title}</span>
            <div
              className={styles.executeDiv}
              onClick={() => handleButtonClick(problem.containerId)}
            >
              <img src={containerExecute} alt="execute" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
