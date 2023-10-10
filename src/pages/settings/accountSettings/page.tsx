import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function AccountSettingsPage() {
  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <h1>欢迎使用内容页示例5 Content Page Test - Account Settings</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
