import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function TestManagementPage() {
  const itemsPerPage = 10; // 每页显示的数据行数
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  // 使用 useEffect 来触发数据加载
  useEffect(() => {
    // 使用fetch来获取数据
    fetch("http://localhost:3000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 解析JSON响应
      })
      .then((items) => {
        // 更新items状态以触发重新渲染
        setItems(items);
        console.log(items);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // 空数组表示仅在组件加载时运行

  const handleModify = (questionId: number) => {
    // TODO 修改操作
    console.log(`Modify item with ID: ${questionId}`);
  };

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
                  <th style={thStyle}>Question</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.questionId}>
                    <td style={tdStyle}>{item.questionId}</td>
                    <td style={tdStyle}>{item.questionContent}</td>
                    <td style={tdStyle}>{item.type}</td>
                    <td>
                      <button
                        style={buttonStyle}
                        onClick={() => handleModify(item.questionId)}
                      >
                        Modify
                      </button>
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

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#2980b9",
};

export default TestManagementPage;
