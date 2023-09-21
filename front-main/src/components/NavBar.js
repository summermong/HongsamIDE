import React from "react";
import styles from "./NavBar.module.css";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    console.log("로그인 버튼을 눌렀습니다.");
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBarTitle} onClick={navigateToHome}>
        Hongsam IDE
      </div>
      <div className={styles.NavBarLogin} onClick={handleLoginClick}>
        로그인
        <FaCog className={styles.NavBarIcon} />
      </div>
    </div>
  );
};

export default NavBar;
