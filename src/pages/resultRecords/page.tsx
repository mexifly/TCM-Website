import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import axios from "axios";

interface Respondent {
  id: number;
  reference_number: string;
  timestamp: string;
  constitution: string;
}

interface ResponseDetail {
  question: string;
  answer: string;
}
interface ModalProps {
  onClose: () => void;
  data: { question: string; answer: string }[];
}

interface ConstitutionType {
  consId: number;
  consType: string;
  // 其他可能的字段...
}

function ResultRecordsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [inputPage, setInputPage] = useState("");
  const [responseData, setResponseData] = useState<Respondent[]>([]); // Use the interface here
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ResponseDetail[]>([]);
  const [referenceFilter, setReferenceFilter] = useState("");
  const [constitutionFilter, setConstitutionFilter] = useState("");
  const [constitutionTypes, setConstitutionTypes] = useState<string[]>([]);

  const handleDetails = async (referenceNumber: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/responses/${referenceNumber}`
      );
      const data = response.data;
      setModalData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  // 更新 handleDelete 使用 axios
  // 定义 handleDelete 函数
  const handleDelete = async (id: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this respondent?"
    );
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/respondents/${id}`
        );
        if (response.status === 200) {
          // 请求成功，刷新数据
          fetchData(referenceFilter, constitutionFilter);
          alert("Respondent deleted successfully");
        } else {
          // 请求未成功，显示错误消息
          alert("Failed to delete respondent");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting");
      }
    }
  };

  // Define fetchData outside of useEffect
  const fetchData = async (reference: string, constitution: string) => {
    const minLoadingTime = 500; // 最小加载时间为 500 毫秒
    const startTime = Date.now();

    setIsLoading(true); // 开始加载
    try {
      const queryParams = new URLSearchParams();
      if (reference) queryParams.append("reference_number", reference);
      if (constitution) queryParams.append("constitution", constitution);

      const response = await axios.get(
        `http://localhost:3000/api/respondents?${queryParams.toString()}`
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      const endTime = Date.now();
      const loadingTime = endTime - startTime;

      setTimeout(() => {
        setIsLoading(false); // 结束加载
      }, Math.max(minLoadingTime - loadingTime, 0)); // 确保至少展示指定的最小加载时间
    }
  };

  const fetchConstitutionTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/constitutionTypes"
      );
      const data = response.data;
      setConstitutionTypes(data); // 直接设置返回的字符串数组
    } catch (error) {
      console.error("Error fetching constitution types:", error);
    }
  };
  useEffect(() => {
    fetchData("", ""); // 加载初始数据
    fetchConstitutionTypes(); // 加载所有 constitution 类型
  }, []);

  const Modal: React.FC<ModalProps> = ({ onClose, data }) => {
    const modalOverlayStyle: React.CSSProperties = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    };

    const modalStyle: React.CSSProperties = {
      backgroundColor: "#FEFDDB",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "80%",
      maxHeight: "80%",
      overflowY: "auto",
    };

    const closeButtonStyle: React.CSSProperties = {
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      fontSize: "1.5rem",
    };
    return (
      <div style={modalOverlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <button style={closeButtonStyle} onClick={onClose}>
            ×
          </button>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredData = responseData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(responseData.length / itemsPerPage);

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

  // 定义 handleDownload 函数
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/downloadRespondents",
        {
          responseType: "blob", // 重要: 指定响应类型为 Blob
        }
      );

      // 创建一个 Blob 对象
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      // 创建一个链接元素来下载 Blob
      const a = document.createElement("a");
      a.href = url;
      a.download = "respondents.xlsx"; // 指定下载的文件名
      document.body.appendChild(a);
      a.click();

      // 清理和撤销 URL 对象
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("An error occurred while downloading the file");
    }
  };

  const tdStyle: React.CSSProperties = {
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    width: "400px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const tableData = filteredData.map((item, index) => (
    <tr key={index}>
      <td style={tdStyle}>{item.reference_number}</td>
      <td style={tdStyle}>{item.constitution}</td>
      <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={() => handleDetails(item.reference_number)}
            style={{
              width: "100px",
              height: "40px",
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "20px",
              marginLeft: "75px",
              padding: "5px",
            }}
          >
            Details
          </button>
          <button
            style={{
              width: "100px",
              height: "40px",
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              padding: "5px",
              backgroundColor: "#EC2E08",
            }}
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));

  const applyFilters = () => {
    fetchData(referenceFilter, constitutionFilter);
  };

  const inputStyle: React.CSSProperties = {
    width: "40px",
    textAlign: "center",
    padding: "5px",
    margin: "0 10px",
  };

  const tableContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "700px",
    overflowY: "auto" as "auto",
    marginTop: "30px",
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
    backgroundColor: "#ADD8E6", // 设置为淡蓝色
  };

  const downloadButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
    width: "130px",
    height: "40px",
  };

  const statisticsButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#2256F0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "110px",
    width: "130px",
    height: "40px",
  };

  const paginationButtonStyle = {
    margin: "5px",
    padding: "8px 6px",
    backgroundColor: "#04DB9E",
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
    marginBottom: "2  0px",
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
  const spinnerStyle = {
    border: "5px solid #f3f3f3", // 浅灰色
    borderTop: "5px solid #3498db", // 蓝色
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 2s linear infinite", //
  };

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // 整个视口的高度
    marginLeft: "800px", // 向右移动 300px
  };

  return (
    <div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          {isLoading && (
            <div style={spinnerContainerStyle}>
              <div style={spinnerStyle}></div> {/* 加载指示器 */}
            </div>
          )}

          {!isLoading && (
            <div className={classes.maincontent} style={mainContentStyle}>
              <div style={topContainerStyle}>
                <input
                  type="text"
                  placeholder="Reference Number"
                  value={referenceFilter}
                  onChange={(e) => setReferenceFilter(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                {/* Constitution Type Filter */}
                <select
                  value={constitutionFilter}
                  onChange={(e) => setConstitutionFilter(e.target.value)}
                  style={{ marginRight: "10px" }}
                >
                  <option value="">--Select Constitution Type--</option>
                  {constitutionTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Apply Filters Button */}
                <button
                  onClick={applyFilters}
                  style={{ marginRight: "10px", width: "200px" }}
                >
                  Apply Filters
                </button>

                <button
                  onClick={() => {
                    setReferenceFilter("");
                    setConstitutionFilter(""); // 重置constitutionFilter
                    fetchData("", "");
                    fetchConstitutionTypes();
                  }}
                  style={{ marginRight: "300px", width: "200px" }}
                >
                  Refresh
                </button>

                <button style={statisticsButtonStyle}>
                  <Link
                    to="/pages/statistics"
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "white", margin: "0px" }}>
                      Statistics
                    </span>
                  </Link>
                </button>
                <button style={downloadButtonStyle} onClick={handleDownload}>
                  Download
                </button>
              </div>
              <div style={tableContainerStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Reference Number</th>
                      <th style={thStyle}>Constitution</th>
                      <th style={thStyle}>Test Time</th>
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
          )}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} data={modalData} />
      )}
    </div>
  );
}

export default ResultRecordsPage;
