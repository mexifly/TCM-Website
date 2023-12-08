import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import axios from "axios"; // 确保已经导入 axios
import { Link, useNavigate } from "react-router-dom";

interface AdminInfo {
  adminId: number;
  adminFirstName: string | null | undefined;
  adminLastName: string | null | undefined;
  adminEmail: string;
  adminAddress: string | null | undefined;
  adminPhoneNumber: string | null | undefined;
  avatar: string | undefined;
}

function Header() {
  const navigate = useNavigate();
  // 设置下拉菜单的状态
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 设置用户信息的状态
  const [user, setUser] = useState<AdminInfo>({} as AdminInfo);

  const handleExit = () => {
    localStorage.removeItem("token");
    navigate("/"); // 重定向到登录页面（根据您的路由路径调整）
  };
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
    let isMounted = true;
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      const cachedUser = localStorage.getItem("cachedUser");

      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        return;
      }

      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3000/getUserInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUser(response.data);
          localStorage.setItem("cachedUser", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // 错误处理逻辑...
      }
    };

    fetchUserInfo();
    return () => {
      isMounted = false;
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
            <button onClick={handleExit}>Exit</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
