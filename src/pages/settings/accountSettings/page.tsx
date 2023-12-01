import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";
import axios from "axios";
import Modal from "react-modal";

interface AdminItem {
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminAddress: string;
  adminPhoneNumber: string;
  // Add any other fields that your items might have
}

interface NewAdminState {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  confirmAdminPassword: string;
  adminAddress: string;
  adminPhoneNumber: string;
  adminPhoto: File | null; // Allow both File and null types
}
function AccountSettingsPage() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState<NewAdminState>({
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
    confirmAdminPassword: "",
    adminAddress: "",
    adminPhoneNumber: "",
    adminPhoto: null,
  });

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

  // 新增管理员的表单处理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAdmin({ ...newAdmin, adminPhoto: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newAdmin.adminPassword !== newAdmin.confirmAdminPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("adminFirstName", newAdmin.adminFirstName);
    formData.append("adminLastName", newAdmin.adminLastName);
    formData.append("adminEmail", newAdmin.adminEmail);
    formData.append("adminPassword", newAdmin.adminPassword);
    formData.append("adminAddress", newAdmin.adminAddress);
    formData.append("adminPhoneNumber", newAdmin.adminPhoneNumber);

    if (newAdmin.adminPhoto) {
      formData.append("adminPhoto", newAdmin.adminPhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/Add_New_Admin",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        alert("Administrator added successfully!");
        fetchData(); // 刷新列表
        setModalIsOpen(false); // 关闭模态窗口
      } else {
        // 如果状态码不是成功的状态码，显示错误消息
        alert(`Failed to add administrator: ${response.status}`);
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error occurred during admin addition:", error);

      if (error instanceof Error) {
        // Now we can safely access common Error properties like 'message'
        alert(`An error occurred: ${error.message}`);
      } else {
        // Handle cases where the error might not be an instance of Error
        alert("An unknown error occurred while adding the administrator");
      }
    }
  };

  const modalStyles: Modal.Styles = {
    overlay: {
      position: "fixed", // 不需要类型断言
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 300ms ease-in-out",
    },
    content: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "50%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
      position: "relative", // 这里应该是合法的
      margin: "0 auto",
      transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
    },
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
  };

  const submitButtonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    backgroundColor: "#007bff",
    cursor: "pointer",
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
                onClick={() => setModalIsOpen(true)}
              >
                Add New Administrator
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={modalStyles}
              contentLabel="Add New Administrator"
            >
              <span
                className="close-button"
                style={{
                  float: "right",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setModalIsOpen(false)}
              >
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                {/* 表单元素 */}
                <div style={{ marginBottom: "15px" }}>
                  <label style={labelStyle}>
                    Please upload your profile photo
                  </label>
                  <input
                    type="file"
                    name="adminPhoto"
                    onChange={handleFileChange}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    name="adminFirstName"
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    name="adminLastName"
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>Password</label>
                  <input
                    type="password"
                    name="adminPassword"
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmAdminPassword"
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                  <label style={labelStyle}>Address</label>
                  <input
                    type="text"
                    name="adminAddress"
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="text"
                    name="adminPhoneNumber"
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </Modal>
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
