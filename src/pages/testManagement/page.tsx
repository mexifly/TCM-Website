import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function TestManagementPage() {
  const itemsPerPage = 10; // 每页显示的数据行数
  const [currentPage, setCurrentPage] = useState(1);
  // TODO 每页显示行数功能

  const handleModify = (itemId: number) => {
    // TODO 修改操作
    console.log(`Modify item with ID: ${itemId}`);
  };

  //测试数据 Test Data
  const items = [
    {
      id: 1,
      name: "Do you feel energetic?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 2,
      name: "Do you feel tired easily?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 3,
      name: "Comparing to people around you, do you always feel colder and need to wear more clothes to keep warm?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 4,
      name: "Are you able to adapt to changes in the environment and society?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 5,
      name: "Does your voice sound too soft? For example, you often need to raise your voice for people to hear you.",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 6,
      name: "Do you always feel something is bothering you making you unhappy?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 7,
      name: "Do you have difficulties remembering things?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 8,
      name: "Do you have difficulties falling asleep at night?",
      description: "平和质 Neutral Constitution",
    },
    {
      id: 9,
      name: "Do you feel tired easily?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 10,
      name: "Do you feel shortness of breath easily?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 11,
      name: "Does your voice sound too soft? ",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 12,
      name: "Do you experience fast heartbeat easily?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 13,
      name: "Do you prefer quiet and don't like to talk?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 14,
      name: "Do you prefer quiet and don't like to talk?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 15,
      name: "Comparing to people around you, do you catch a cold easily?",
      description: "气虚质 Qi Deficient Constitution",
    },
    {
      id: 16,
      name: "Do you find yourself sweat easily when you have a bit more physical activity?",
      description: "气虚质 Qi Deficient Constitution",
    },
  ];

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
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.description}</td>
                    <td>
                      <button
                        style={buttonStyle}
                        onClick={() => handleModify(item.id)}
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
