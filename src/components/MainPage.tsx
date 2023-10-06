import React from "react";
import "./MainPage.css";

const SidebarItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="sidebar-item">{label}</div>
);

const MainContent: React.FC = () => (
  <div className="main-content">maincontent</div>
);

const MainPage: React.FC = () => {
  return (
    <div className="app">
      <div className="top-bar">Your UnClickable Bar</div>
      <div className="content">
        <div className="sidebar">
          <SidebarItem label="Item 1" />
          <SidebarItem label="Item 2" />
          <SidebarItem label="Item 3" />
          <SidebarItem label="Item 4" />
        </div>

        <div> haha</div>
      </div>
    </div>
  );
};

export default MainPage;
