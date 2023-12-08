import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

const AdminManagement = () => {
  const [adminData, setAdminData] = useState({
    adminId: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminAddress: "",
    adminPhoneNumber: "",
    photo: "",
  });

  useEffect(() => {
    const fetchAdminInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3000/getUserInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminData({
          ...response.data,
          adminId: response.data.adminId, // 保证adminId是正确的
          photo: response.data.avatar, // 假设avatar字段现在存储图片URL
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
        // 可能的错误处理
      }
    };

    fetchAdminInfo();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [event.target.name]: event.target.value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Fetch admin data and current photo
    const adminId = adminData.adminId;
    if (!adminId) {
      alert("Admin ID is missing.");
      return;
    }

    // Upload new photo
    const formData = new FormData();
    if (event.target.files && event.target.files[0]) {
      formData.append("photo", event.target.files[0]);
      formData.append("adminId", adminId); // 将管理员ID添加到表单数据中

      axios
        .post("http://localhost:3000/uploadAdminPhoto", formData)
        .then((response) => {
          setAdminData((prevState) => ({
            ...prevState,
            photo: response.data.filePath,
          }));
          alert("Photo uploaded successfully!");
        })
        .catch((error) => console.error("Error uploading photo:", error));
    } else {
      alert("fail");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Update admin data
    axios
      .post("http://localhost:3000/api/admin/updateInfo", adminData)
      .then(() => {
        alert("Information updated successfully!");
      })
      .catch((error) => console.error("Error updating info:", error));
  };

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ marginLeft: "660px" }}>
              <div style={{ height: "60px" }}></div>
              <h2 style={{ fontWeight: "bold" }}>Personal Information</h2>
              <div style={{ height: "20px" }}></div>
              <div>
                {adminData.photo && (
                  <img
                    src={adminData.photo}
                    alt="Admin"
                    style={{ maxWidth: "300px", marginBottom: "10px" }}
                  />
                )}
              </div>
              <input type="file" onChange={handlePhotoUpload} />
              <div style={{ height: "30px" }}></div>
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <label style={{ marginRight: "25px", fontWeight: "bold" }}>
                  Admin First Name:
                  <input
                    type="text"
                    name="adminFirstName"
                    value={adminData.adminFirstName}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "5px", color: "blue" }}
                  />
                </label>

                <div style={{ height: "30px" }}></div>
                <label style={{ marginRight: "25px", fontWeight: "bold" }}>
                  Admin Last Name:
                  <input
                    type="text"
                    name="adminLastName"
                    value={adminData.adminLastName}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "5px", color: "blue" }}
                  />
                </label>

                <div style={{ height: "30px" }}></div>
                <label style={{ marginRight: "23px", fontWeight: "bold" }}>
                  Admin Email:
                  <input
                    type="email"
                    name="adminEmail"
                    value={adminData.adminEmail}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "40px", color: "blue" }}
                  />
                </label>
                <div style={{ height: "30px" }}></div>

                <label style={{ marginRight: "20px", fontWeight: "bold" }}>
                  Admin Address:
                  <input
                    type="text"
                    name="adminAddress"
                    value={adminData.adminAddress}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "20px", color: "blue" }}
                  />
                </label>
                <div style={{ height: "30px" }}></div>

                <label style={{ marginRight: "20px", fontWeight: "bold" }}>
                  Phone Number:
                  <input
                    type="text"
                    name="adminPhoneNumber"
                    value={adminData.adminPhoneNumber}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "20px", color: "blue" }}
                  />
                </label>
                <div style={{ height: "30px" }}></div>

                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
