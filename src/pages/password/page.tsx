// ChangePassword.tsx
import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const adminId = user.user.adminId;

    const response = await fetch("http://localhost:3000/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId,
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Password changed successfully. Please Login again");

      // 清除localStorage中的user信息
      localStorage.removeItem("user");

      // 重定向到根路径
      window.location.href = "/";
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <h1 style={{ marginTop: "50px" }}>Change My Password</h1>
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
