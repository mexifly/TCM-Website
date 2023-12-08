import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  // any other properties you expect to have
}

function ConstitutionSettingsPage() {
  const [items, setItems] = useState<ConstitutionItem[]>([]);
  const [originalItems, setOriginalItems] = useState<ConstitutionItem[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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
        setOriginalItems(fetchedItems);
        console.log(fetchedItems);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    const filteredItems = selectedType
      ? originalItems.filter((item) => item.consType === selectedType)
      : originalItems;
    setItems(filteredItems);
  }, [selectedType, originalItems]);

  // 获取当前页展示的数据
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

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

  const totalPages = Math.ceil(items.length / pageSize);

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              Constitution Maintenance Content Page
            </span>
            <div style={dropdownContainer}>
              <div style={dropdownText}>
                <span>Filter Constitution Type:</span>
              </div>
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
                {currentItems.map((item) => (
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
            <div style={paginationContainer}>
              <div style={paginationButtonContainer}>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
              </div>
              <div style={{ ...paginationSelect, ...itemsPerPageLabel }}>
                <span>Show items per page: </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setCurrentPage(1); // 重置到第一页
                    setPageSize(Number(e.target.value));
                  }}
                  style={dropdown}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
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
  marginBottom: "20px",
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
  display: "flex",
  alignItems: "center",
  marginBottom: "40px", // 用于分开下拉框和列表
};

const dropdownText: React.CSSProperties = {
  marginRight: "10px", // 文本和下拉框之间的间距
};

const dropdown: React.CSSProperties = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const paginationContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const paginationButtonContainer: React.CSSProperties = {
  display: "flex",
  gap: "12px", // 调整按钮之间的间距
};

const paginationSelect: React.CSSProperties = {
  marginLeft: "100px", // 控制下拉框与其他元素的间距
};

const itemsPerPageLabel: React.CSSProperties = {
  marginRight: "10px", // 控制 "Show items per page" 和下拉框的间距
};

export default ConstitutionSettingsPage;
