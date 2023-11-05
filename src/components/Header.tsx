import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  // 设置下拉菜单的状态
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 切换下拉菜单的显示与隐藏
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(user);
  };

  const dropdownMenuClass = dropdownOpen
    ? `${styles["dropdown-menu"]} ${styles.show}`
    : styles["dropdown-menu"];

  const dropdownIconClass = dropdownOpen
    ? `${styles["dropdown-icon"]} ${styles.rotate}` // 当下拉菜单打开时添加 rotate 类
    : styles["dropdown-icon"]; // 默认类

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userAvatar = user.user.avatar; // directly accessing the avatar from localStorage

  return (
    <header className={styles.header}>
      <span className={styles.logo}>TCM Admin Platform</span>
      <div className={styles["user-info"]}>
        <span>Welcome, Administrator</span>

        <div className={styles["user-menu"]}>
          <img src={userAvatar} alt="" className={styles.avatar} />

          <div className={dropdownIconClass} onClick={toggleDropdown}></div>

          <div className={dropdownMenuClass}>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
            <Link to="/">
              <button>Exit</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
