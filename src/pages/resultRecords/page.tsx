import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function ResultRecordsPage() {
  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Header 1</th>
                    <th style={thStyle}>Header 2</th>
                    <th style={thStyle}>Header 3</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(30)].map((_, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>Data 1-{index + 1}</td>
                      <td style={tdStyle}>Data 2-{index + 1}</td>
                      <td style={tdStyle}>Data 3-{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const tableContainerStyle: React.CSSProperties = {
  width: "80%",
  height: "calc(100vh - 52px)", // Replace [HEIGHT_OF_HEADER] with the actual height of your header
  overflowY: "auto",
  marginLeft: "auto",
  marginRight: "auto",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse" as "collapse",
};

const thStyle: React.CSSProperties = {
  borderBottom: "2px solid #ddd",
  padding: "16px",
  textAlign: "left",
  fontSize: "2em",
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
  padding: "16px",
  fontSize: "2em",
};

export default ResultRecordsPage;
