import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function ConstitutionSettingsPage() {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/constitution_results")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedItems) => {
        setItems(fetchedItems);
        setOriginalItems(fetchedItems); // 保存原始数据
        console.log(fetchedItems);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    // 根据选定的类型筛选原始数据
    const filteredItems = selectedType
      ? originalItems.filter((item) => item.consType === selectedType)
      : originalItems;
    setItems(filteredItems);
  }, [selectedType, originalItems]); // 监听selectedType和originalItems的变化

  // 下拉框选项
  const constitutionTypes = [
    "Neutral Constitution",
    "Qi Deficient Constitution",
    "Yang Deficient Constitution",
    "Yin Deficient Constitution",
    "Phlegm-Dampness Constitution",
    "Damp-Heat Constitution",
    "Blood Stasis Constitution",
    "Qi-Stagnation Constitution",
    "Intrinsic Constitution",
  ];

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <div style={dropdownContainer}>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={dropdown}
              >
                <option value="">All Types</option>
                {constitutionTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
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

const dropdownContainer: React.CSSProperties = {
  marginBottom: "20px", // 用于分开下拉框和列表
};

const dropdown: React.CSSProperties = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default ConstitutionSettingsPage;
