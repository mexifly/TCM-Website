import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

interface AdminItem {
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminAddress: string;
  adminPhoneNumber: string;
  // Add any other fields that your items might have
}

function AccountSettingsPage() {
  const [items, setItems] = useState<AdminItem[]>([]);

  useEffect(() => {
    // Fetch data from backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admins"); // Adjust the API endpoint as needed
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (adminId: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete admin with ID: ${adminId}?`
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:3000/deleteAdmin/${adminId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error deleting admin");
        }

        // Refresh the list after deletion
        fetchData();
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }
  };

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "60px",
                marginBottom: "30px",
              }}
            >
              <button
                style={{
                  width: "200px",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                Add New Administrator
              </button>
            </div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>First Name</th>
                  <th style={thStyle}>Last Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Phone Number</th>
                  <th style={thStyle}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.adminId}>
                      <td style={tdStyle}>{item.adminId}</td>
                      <td style={tdStyle}>{item.adminFirstName}</td>
                      <td style={tdStyle}>{item.adminLastName}</td>
                      <td style={tdStyle}>{item.adminEmail}</td>
                      <td style={tdStyle}>{item.adminAddress}</td>
                      <td style={tdStyle}>{item.adminPhoneNumber}</td>
                      <td style={buttonColumnStyle}>
                        <button
                          style={buttonStyleDelete}
                          onClick={() => handleDelete(item.adminId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={tdStyle}>
                      Loading data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const contentMain: React.CSSProperties = {
  flex: 1,
  padding: "30px", // assuming 20px
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
// 定义内联样式 Define inline style
const tableStyle: React.CSSProperties = {
  width: "1600px",
  borderCollapse: "collapse",
  marginLeft: "10px",
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

const buttonColumnStyle: React.CSSProperties = {
  width: "120px", // Adjust the width as needed
};

const buttonStyleModify: React.CSSProperties = {
  backgroundColor: "#00b300",
  color: "#fff",
  border: "none",
  padding: "2px 3px", // 调整按钮的大小
  cursor: "pointer",
  borderRadius: "4px", // 添加圆角
};

const buttonStyleDelete: React.CSSProperties = {
  backgroundColor: "#ff3333",
  color: "#fff",
  border: "none",
  padding: "2px 3px",
  cursor: "pointer",
  borderRadius: "4px",
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#2980b9",
};

export default AccountSettingsPage;
