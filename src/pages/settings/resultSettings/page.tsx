import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function ResultSettingsPage() {
  //测试数据 Test Data
  const items = [
    {
      id: 1,
      num: "001",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 2,
      num: "002",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 3,
      num: "003",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 4,
      num: "004",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 5,
      num: "005",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 6,
      num: "006",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 7,
      num: "007",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 8,
      num: "008",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 9,
      num: "009",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 10,
      num: "010",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 11,
      num: "011",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 12,
      num: "012",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 13,
      num: "013",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 14,
      num: "014",
      time: "2023-06-22 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
    },
    {
      id: 15,
      num: "015",
      time: "2023-08-21 20:02",
      type1: "15.1",
      type2: "35.0",
      type3: "21.7",
      type4: "15.1",
      type5: "35.0",
      type6: "21.7",
      type7: "15.1",
      type8: "35.0",
      type9: "21.7",
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
                  <th style={thStyle}>Test Number</th>
                  <th style={thStyle}>Test Time</th>
                  <th style={thStyle}>Type1</th>
                  <th style={thStyle}>Type2</th>
                  <th style={thStyle}>Type3</th>
                  <th style={thStyle}>Type4</th>
                  <th style={thStyle}>Type5</th>
                  <th style={thStyle}>Type6</th>
                  <th style={thStyle}>Type7</th>
                  <th style={thStyle}>Type8</th>
                  <th style={thStyle}>Type9</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.num}</td>
                    <td style={tdStyle}>{item.time}</td>
                    <td style={tdStyle}>{item.type1}</td>
                    <td style={tdStyle}>{item.type2}</td>
                    <td style={tdStyle}>{item.type3}</td>
                    <td style={tdStyle}>{item.type4}</td>
                    <td style={tdStyle}>{item.type5}</td>
                    <td style={tdStyle}>{item.type6}</td>
                    <td style={tdStyle}>{item.type7}</td>
                    <td style={tdStyle}>{item.type8}</td>
                    <td style={tdStyle}>{item.type9}</td>
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

export default ResultSettingsPage;
