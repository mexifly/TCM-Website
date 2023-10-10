// components/Header.js
import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>TCM Admin Platform</span>
      <div className={styles["user-info"]}>
        <span>Welcome, Administrator</span>
        <Link to="/">
          <button>Exit</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
