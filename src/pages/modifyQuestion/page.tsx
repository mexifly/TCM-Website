import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyQuestionPage() {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [modifiedData, setModifiedData] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/questions/${questionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestionData(data);
        setModifiedData({ type: data.type, text: data.questionContent });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [questionId]);

  const handleTypeChange = (e: { target: { value: any } }) => {
    setModifiedData({ ...modifiedData, type: e.target.value });
  };

  const handleTextChange = (e: { target: { value: any } }) => {
    setModifiedData({ ...modifiedData, text: e.target.value });
  };

  const handleSave = () => {
    const dataToSend = {
      type: modifiedData.type,
      questionContent: modifiedData.text,
    };

    fetch(`http://localhost:3000/questions/${questionId}`, {
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
                Modify Question Information - ID: {questionId}
              </h1>
              <div className={classes.formGroup}>
                <label className={classes.label}>Constitution Type:</label>
                <input
                  type="text"
                  className={classes.input}
                  value={modifiedData.type}
                  onChange={handleTypeChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Question Content:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.text}
                  onChange={handleTextChange}
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
