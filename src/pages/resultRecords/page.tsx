import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function ResultRecordsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const totalPages = 3; // Assume you have 30 records

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newPage = parseInt(inputPage);
      if (!isNaN(newPage) && newPage >= 1) {
        setCurrentPage(newPage);
      }
    }
  };

  const visiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const tdStyle: React.CSSProperties = {
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    width: "400px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const tableData = [...Array(30)].map((_, index) => (
    <tr key={index}>
      <td style={tdStyle}>Data 1-{index + 1}</td>
      <td style={tdStyle}>Data 2-{index + 1}</td>
      <td style={tdStyle}>Data 3-{index + 1}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            style={{
              width: "100px",
              height: "40px",
              fontSize: "20px",
              marginRight: "20px",
              marginLeft: "75px",
              marginTop: "10px",
              marginBottom: "10px",
              padding: "5px",
            }}
          >
            Delete
          </button>
          <button
            style={{
              width: "100px",
              height: "40px",
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              padding: "5px",
            }}
          >
            Details
          </button>
        </div>
      </td>
    </tr>
  ));

  const inputStyle: React.CSSProperties = {
    width: "40px",
    textAlign: "center",
    padding: "5px",
    margin: "0 10px",
  };

  const tableContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "85%",
    overflowY: "auto" as "auto",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "0px",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  };

  const thStyle: React.CSSProperties = {
    borderBottom: "2px solid #ddd",
    padding: "16px",
    textAlign: "center",
    fontSize: "2em",
    borderRight: "1px solid #ddd",
    backgroundColor: "#DDDDDD",
  };

  const downloadButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "0px",
    marginBottom: "10px",
    marginLeft: "1300px",
    width: "130px",
    height: "40px",
  };

  const paginationButtonStyle = {
    margin: "5px",
    padding: "8px 6px",
    backgroundColor: "#5555FF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
  };

  const topContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "0px",
    height: "7%",
    width: "100%",
    marginTop: "0px",
  };

  const paginationButtonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    width: "200px",
    marginTop: "0px",
  };

  const mainContentStyle: React.CSSProperties = {
    height: "93%",
  };

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent} style={mainContentStyle}>
            <div style={topContainerStyle}>
              <button style={downloadButtonStyle}>Download</button>
            </div>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Reference Number</th>
                    <th style={thStyle}>Grades</th>
                    <th style={thStyle}>Test Date</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>{tableData.slice(firstIndex, lastIndex)}</tbody>
              </table>
            </div>
            <div style={paginationButtonContainerStyle}>
              <button
                style={paginationButtonStyle}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {visiblePages().map((page) => (
                <button
                  key={page}
                  style={paginationButtonStyle}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <input
                type="text"
                style={inputStyle}
                value={inputPage}
                onChange={handlePageInput}
                onKeyDown={handlePageSubmit}
              />
              <button
                style={paginationButtonStyle}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultRecordsPage;
