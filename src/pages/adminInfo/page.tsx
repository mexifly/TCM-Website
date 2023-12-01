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
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    // Fetch admin data and current photo
    const adminId = user.user.adminId;
    if (adminId) {
      axios
        .get(`http://localhost:3000/api/admin/${adminId}/info`) // Assuming a route to fetch admin info by ID
        .then((response) => {
          console.log(response.data);
          setAdminData(response.data);
          // Fetch photo
          axios
            .get(`http://localhost:3000/api/admin/${adminId}/photo`)
            .then((photoResponse) => {
              setAdminData((prevState) => ({
                ...prevState,
                photo: photoResponse.data.photoUrl,
              }));
            })
            .catch((photoError) =>
              console.error("Error fetching photo:", photoError)
            );
        })
        .catch((error) => console.error("Error fetching admin data:", error));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [event.target.name]: event.target.value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    // Fetch admin data and current photo
    const adminId = user.user.adminId;
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
          let storedData = JSON.parse(localStorage.getItem("user") || "{}");
          let updatedUser = storedData.user ? { ...storedData.user } : {};

          updatedUser.avatar = response.data.filePath; // 更新头像 URL

          localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
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
              <h2>Personal Information</h2>
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
                <label style={{ marginRight: "25px" }}>
                  Admin First Name:
                  <input
                    type="text"
                    name="adminFirstName"
                    value={adminData.adminFirstName}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "5px" }}
                  />
                </label>

                <div style={{ height: "30px" }}></div>
                <label style={{ marginRight: "25px" }}>
                  Admin Last Name:
                  <input
                    type="text"
                    name="adminLastName"
                    value={adminData.adminLastName}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "5px" }}
                  />
                </label>

                <div style={{ height: "30px" }}></div>
                <label style={{ marginRight: "23px" }}>
                  Admin Email:
                  <input
                    type="email"
                    name="adminEmail"
                    value={adminData.adminEmail}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "40px" }}
                  />
                </label>
                <div style={{ height: "30px" }}></div>

                <label style={{ marginRight: "20px" }}>
                  Admin Address:
                  <input
                    type="text"
                    name="adminAddress"
                    value={adminData.adminAddress}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "20px" }}
                  />
                </label>
                <div style={{ height: "30px" }}></div>

                <label style={{ marginRight: "15px" }}>
                  Phone Number:
                  <input
                    type="text"
                    name="adminPhoneNumber"
                    value={adminData.adminPhoneNumber}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "20px" }}
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
