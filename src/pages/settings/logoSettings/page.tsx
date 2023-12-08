import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function LogoSettingsPage() {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    // 获取当前的logo
    axios
      .get("http://localhost:3000/currentLogo")
      .then((response) => {
        setLogo(response.data.logoUrl);
      })
      .catch((error) => {
        console.error("Error fetching logo:", error);
      });
  }, []);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("logo", file);

      axios
        .post("http://localhost:3000/uploadLogo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // 更新logo的URL状态
          // 这里假设后端返回的字段是 data.path
          setLogo(response.data.logoUrl);
        })
        .catch((error) => {
          console.error("Error uploading logo:", error);
        });
    }
  };

  // 样式对象
  const mainContentStyle: React.CSSProperties = {
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div style={mainContentStyle}>
            <div
              style={{
                height: "200px",
                width: "100%",
                textAlign: "center",
                verticalAlign: "middle",
                paddingTop: "60px",
                fontSize: "3em",
                fontFamily: "sans-serif",
                marginLeft: "500px",
                fontWeight: "bold",
              }}
            >
              Set New Website Logo
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "100px",
                marginLeft: "500px",
              }}
            >
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  marginBottom: "100px",
                  backgroundColor: "#f8f8f8",
                  color: "#ccc",
                  fontSize: "20px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt="Website Logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  "No Logo Available"
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                style={{ display: "none" }}
                id="logoUpload"
              />
              <label
                htmlFor="logoUpload"
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  marginTop: "20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1em",
                }}
              >
                Upload New Logo
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoSettingsPage;
