import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

interface ConstitutionItem {
  consId: number;
  consType: string;
  definition: string;
  disturbance: string;
  cause: string;
  vigilant: string;
  improvement: string;
}

function ConstitutionSettingsPage() {
  const [items, setItems] = useState<ConstitutionItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/constitution_results")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((items: ConstitutionItem[]) => {
        setItems(items);
        console.log(items);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Constitution Type</th>
                  <th style={thStyle}>Definition</th>
                  <th style={thStyle}>Disturbance</th>
                  <th style={thStyle}>Causes</th>
                  <th style={thStyle}>The Most Vigilant</th>
                  <th style={thStyle}>Improvements</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.consId}>
                    <td style={tdStyle}>{item.consId}</td>
                    <td style={tdStyle}>{item.consType}</td>
                    <td style={tdStyle}>{item.definition}</td>
                    <td style={tdStyle}>{item.disturbance}</td>
                    <td style={tdStyle}>{item.cause}</td>
                    <td style={tdStyle}>{item.vigilant}</td>
                    <td style={tdStyle}>{item.improvement}</td>
                    <td>
                      <Link to={`/modify_constitution/${item.consId}`}>
                        <button style={buttonStyle}>Modify</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 定义内联样式 Define inline style
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  textAlign: "left",
  padding: "10px",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3498db",
  color: "#fff",
  border: "none",
  padding: "2px 3px", // 调整按钮的大小
  cursor: "pointer",
  borderRadius: "4px", // 添加圆角
};

export default ConstitutionSettingsPage;
