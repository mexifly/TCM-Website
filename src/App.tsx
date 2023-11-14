import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./page";
import TestManagementPage from "./pages/testManagement/page";
import ResultRecordsPage from "./pages/resultRecords/page";
import AccountSettingsPage from "./pages/settings/accountSettings/page";
import LogoSettingsPage from "./pages/settings/logoSettings/page";
import ResultSettingsPage from "./pages/settings/resultSettings/page";
import ModifyQuestionPage from "./pages/modifyQuestion/page";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminManagement from "./pages/adminInfo/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/main" element={<Home></Home>}></Route>
        <Route
          path="/pages/testManagement"
          element={<TestManagementPage></TestManagementPage>}
        ></Route>
        <Route
          path="/modify_question/:questionId"
          element={<ModifyQuestionPage></ModifyQuestionPage>}
        ></Route>
        <Route
          path="/pages/resultRecords"
          element={<ResultRecordsPage></ResultRecordsPage>}
        ></Route>
        <Route
          path="/pages/settings/accountSettings"
          element={<AccountSettingsPage></AccountSettingsPage>}
        ></Route>
        <Route
          path="/pages/settings/logoSettings"
          element={<LogoSettingsPage></LogoSettingsPage>}
        ></Route>
        <Route
          path="/pages/resultSettings"
          element={<ResultSettingsPage></ResultSettingsPage>}
        ></Route>
        <Route
          path="/pages/admininfo"
          element={<AdminManagement></AdminManagement>}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
