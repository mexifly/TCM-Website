import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  // 设置下拉菜单的状态
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 设置用户信息的状态
  const [user, setUser] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("user") || "{}");
    return storedData.user || {};
  });

  // 切换下拉菜单的显示与隐藏
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownMenuClass = dropdownOpen
    ? `${styles["dropdown-menu"]} ${styles.show}`
    : styles["dropdown-menu"];

  const dropdownIconClass = dropdownOpen
    ? `${styles["dropdown-icon"]} ${styles.rotate}` // 当下拉菜单打开时添加 rotate 类
    : styles["dropdown-icon"]; // 默认类

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedData.user || {});
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className={styles.header}>
      <span className={styles.logo}>TCM Admin Platform</span>
      <div className={styles["user-info"]}>
        <span>Welcome, Administrator</span>

        <div className={styles["user-menu"]}>
          <img src={user.avatar} alt="User Avatar" className={styles.avatar} />

          <div className={dropdownIconClass} onClick={toggleDropdown}></div>

          <div className={dropdownMenuClass}>
            <Link to="/pages/admininfo">
              <button>Account Information</button>
            </Link>
            <Link to="/pages/password">
              <button>Change Password</button>
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
