import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function ResultSettingsPage() {
  //测试数据 Test Data
  const items = [
    {
      id: 1,
      user: "n1",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 2,
      user: "n2",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 3,
      user: "n3",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 4,
      user: "n4",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 5,
      user: "n5",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 6,
      user: "n6",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 7,
      user: "n7",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 8,
      user: "n8",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 9,
      user: "n9",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 10,
      user: "n10",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 11,
      user: "n11",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 12,
      user: "n12",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 13,
      user: "n13",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 14,
      user: "n14",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
    },
    {
      id: 15,
      user: "n15",
      type: "阳虚质 Yang Deficient Constitution",
      definition: "Alway feel cold",
      confuse: "Low blood pressure, dizziness",
      cause: "Stay up late or all night",
      vigilant: "Obesity, Arthritis, Edema",
      improvement: "Exercise more, refuse to stay up late",
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
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Definition</th>
                  <th style={thStyle}>Disturbance</th>
                  <th style={thStyle}>Causes</th>
                  <th style={thStyle}>The Most Vigilant</th>
                  <th style={thStyle}>Improvements</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.user}</td>
                    <td style={tdStyle}>{item.type}</td>
                    <td style={tdStyle}>{item.definition}</td>
                    <td style={tdStyle}>{item.confuse}</td>
                    <td style={tdStyle}>{item.cause}</td>
                    <td style={tdStyle}>{item.vigilant}</td>
                    <td style={tdStyle}>{item.improvement}</td>
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
