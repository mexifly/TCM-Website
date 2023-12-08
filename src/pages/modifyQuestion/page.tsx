import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyQuestionPage() {
  const { qid } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [modifiedData, setModifiedData] = useState({
    type: "",
    textEn: "",
    textCn: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/questions/${qid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestionData(data);
        setModifiedData({
          textEn: data.textEn,
          textCn: data.textCn,
          type: data.type,
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [qid]);

  const handleTextEnChange = (e: { target: { value: any } }) => {
    setModifiedData({ ...modifiedData, textEn: e.target.value });
  };

  const handleTextCnChange = (e: { target: { value: any } }) => {
    setModifiedData({ ...modifiedData, textCn: e.target.value });
  };

  const handleSave = () => {
    const dataToSend = {
      type: modifiedData.type,
      textEn: modifiedData.textEn,
      textCn: modifiedData.textCn,
    };

    fetch(`http://localhost:3000/questions/${qid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        toast.success("修改成功 Modified successfully!"); // 显示成功提示
        setTimeout(() => {
          navigate("/pages/testManagement");
        }, 1500); // 延迟1.5秒后返回上一界面
      })
      .catch((error) => {
        toast.error("修改失败 Modification failed!"); // 显示失败提示
      });
  };

  return (
    <div>
      <div className={classes.testmanagementpage}>
        <Header />
        <div className={classes.content}>
          <div className={classes.sidebarandmaincontent}>
            <Sidebar />
            <div className={classes.maincontent}>
              <h1 className={classes.heading}>
                Modify Question Information - QID: {qid}
              </h1>
              <div className={classes.formGroup}>
                <label className={classes.label}>Constitution Type:</label>
                <div className={classes.input}>{modifiedData.type}</div>
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>TextEn:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.textEn}
                  onChange={handleTextEnChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>TextCn:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.textCn}
                  onChange={handleTextCnChange}
                />
              </div>
              <div className={classes.buttonGroup}>
                <button className={classes.saveButton} onClick={handleSave}>
                  Save
                </button>
                <button
                  className={classes.backButton}
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ModifyQuestionPage;
