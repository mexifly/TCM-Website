// ChangePassword.tsx
import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // 密码更改成功
        localStorage.removeItem("token"); // 清除 token
        alert("Password changed successfully! Please login again.");
        window.location.href = "/";
      } else {
        // 其他情况，例如401或403错误
        alert("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <h1 style={{ marginTop: "50px", fontWeight: "bold" }}>
              Change My Password
            </h1>
            <div style={{ height: "130px" }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="currentPassword"
                style={{ marginRight: "60px", marginLeft: "20px" }}
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ width: "400px", height: "50px" }}
              />
            </div>
            <div style={{ height: "20px" }}></div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="newPassword"
                style={{ marginRight: "72px", marginLeft: "30px" }}
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: "400px", height: "50px" }}
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <label
                htmlFor="confirmNewPassword"
                style={{ marginRight: "40px" }}
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{ width: "400px", height: "50px" }}
              />
            </div>
            <div style={{ height: "50px" }}></div>
            <button
              onClick={handleChangePassword}
              style={{ width: "200px", height: "70px" }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
