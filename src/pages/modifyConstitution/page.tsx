import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyConstitutionPage() {
  const { consId } = useParams();
  const [constitutionData, setConstitutionData] = useState({});
  const [modifiedData, setModifiedData] = useState({
    consId: "",
    consType: "",
    definition: "",
    disturbance: "",
    cause: "",
    vigilant: "",
    improvement: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/constitution_results/${consId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setConstitutionData(data);
        setModifiedData({
          consId: data.consId,
          consType: data.consType,
          definition: data.definition,
          disturbance: data.disturbance,
          cause: data.cause,
          vigilant: data.vigilant,
          improvement: data.improvement,
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [consId]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedData({ ...modifiedData, consType: e.target.value });
  };

  const handleDefinitionChange = (e) => {
    setModifiedData({ ...modifiedData, definition: e.target.value });
  };

  const handleDisturbanceChange = (e) => {
    setModifiedData({ ...modifiedData, disturbance: e.target.value });
  };

  const handleCauseChange = (e) => {
    setModifiedData({ ...modifiedData, cause: e.target.value });
  };

  const handleVigilantChange = (e) => {
    setModifiedData({ ...modifiedData, vigilant: e.target.value });
  };

  const handleImprovementChange = (e) => {
    setModifiedData({ ...modifiedData, improvement: e.target.value });
  };

  const handleSave = () => {
    const dataToSend = {
      consType: modifiedData.consType,
      definition: modifiedData.definition,
      disturbance: modifiedData.disturbance,
      cause: modifiedData.cause,
      vigilant: modifiedData.vigilant,
      improvement: modifiedData.improvement,
    };

    fetch(`http://localhost:3000/constitution_results/${consId}`, {
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
          navigate("/pages/constitutionSettings");
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
                Modify Constitution Information - ID: {consId}
              </h1>
              <div className={classes.formGroup}>
                <label className={classes.label}>Constitution Type:</label>
                <input
                  type="text"
                  className={classes.input}
                  value={modifiedData.consType}
                  onChange={handleTypeChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Definition:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.definition}
                  onChange={handleDefinitionChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Disturbance:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.disturbance}
                  onChange={handleDisturbanceChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Causes:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.cause}
                  onChange={handleCauseChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>The Most Vigilant:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.vigilant}
                  onChange={handleVigilantChange}
                />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Improvements:</label>
                <textarea
                  className={classes.textarea}
                  value={modifiedData.improvement}
                  onChange={handleImprovementChange}
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

export default ModifyConstitutionPage;
