// pages
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
