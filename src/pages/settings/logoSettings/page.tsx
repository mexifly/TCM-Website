import React, { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function LogoSettingsPage() {
  const [logo, setLogo] = useState<string | null>(null);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mainContentStyle: React.CSSProperties = {
    padding: "0",
  };
  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div style={mainContentStyle}>
            <div
              style={{
                height: "200px",
                marginTop: "0",
                width: "1630px",
                textAlign: "center",
                verticalAlign: "middle",
                paddingTop: "60px",
                fontSize: "3em",
                fontFamily: "sans-serif",
              }}
            >
              Setting New Website Logo
            </div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "250px",
                height: "500px",
              }}
            >
              <img
                src={logo || "path_to_default_logo"}
                alt="Website Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "200px",
                  border: "1px solid #ddd",
                  marginTop: "100px",
                }}
              />
              <br />
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
                  paddingTop: "50px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "5px",
                  width: "300px",
                  height: "150px",
                  textAlign: "center",
                  verticalAlign: "middler",
                  fontSize: "2em",
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
