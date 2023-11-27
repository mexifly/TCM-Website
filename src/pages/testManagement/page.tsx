import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function TestManagementPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [selectedType, setSelectedType] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = selectedType
      ? items.filter((item) => item.type === selectedType)
      : items;
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [selectedType, items]);

  const indexOfFirstItem = (currentPage - 1) * pageSize;
  const indexOfLastItem = Math.min(
    currentPage * pageSize,
    filteredItems.length
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / pageSize);

  // 下拉框选项
  const types = [
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
            <span>Question Maintenance Content Page</span>
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
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>qid</th>
                  <th style={thStyle}>groupId</th>
                  <th style={thStyle}>id</th>
                  <th style={thStyle}>TextEn</th>
                  <th style={thStyle}>TextCn</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.qid}>
                    <td style={tdStyle}>{item.qid}</td>
                    <td style={tdStyle}>{item.groupId}</td>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.textEn}</td>
                    <td style={tdStyle}>{item.textCn}</td>
                    <td style={tdStyle}>{item.type}</td>
                    <td>
                      <Link to={`/modify_question/${item.qid}`}>
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
                    setCurrentPage(1);
                    setPageSize(Number(e.target.value));
                  }}
                  style={dropdown}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const thStyle = {
  backgroundColor: "#f2f2f2",
  textAlign: "left",
  padding: "10px",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const dropdownContainer = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const dropdownText = {
  marginRight: "10px",
};

const dropdown = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const paginationContainer = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const paginationButtonContainer = {
  display: "flex",
  gap: "12px",
};

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "#fff",
  border: "none",
  padding: "2px 3px",
  cursor: "pointer",
  borderRadius: "4px",
};

const paginationSelect = {
  marginLeft: "100px",
};

const itemsPerPageLabel = {
  marginRight: "10px",
};

export default TestManagementPage;
