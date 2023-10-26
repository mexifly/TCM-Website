import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "../ContentPage.module.css";

function ModifyQuestionPage() {
  const { questionId } = useParams();

  // 根据 questionId 获取相应的数据
  // 这里可以发起网络请求获取数据

  return (
    <div>
      <div className={classes.testmanagementpage}>
        <Header />
        <div className={classes.content}>
          <div className={classes.sidebarandmaincontent}>
            <Sidebar />
            <div className={classes.maincontent}>
              {/* 在这里展示数据 */}
              <h1>Test - Modify Data for ID: {questionId}</h1>
              {/* 根据获取的数据展示修改表单或其他内容 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyQuestionPage;
