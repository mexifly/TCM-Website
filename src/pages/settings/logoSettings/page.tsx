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

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <div style={{ textAlign: "center" }}>
              <img
                src={logo || "path_to_default_logo"}
                alt="Website Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "20px",
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
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "5px",
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
