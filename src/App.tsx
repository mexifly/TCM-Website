import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./page";
import TestManagementPage from "./pages/testManagement/page";
import ResultRecordsPage from "./pages/resultRecords/page";
import AccountSettingsPage from "./pages/settings/accountSettings/page";
import LogoSettingsPage from "./pages/settings/logoSettings/page";
import ResultSettingsPage from "./pages/settings/resultSettings/page";

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
          path="/pages/settings/resultSettings"
          element={<ResultSettingsPage></ResultSettingsPage>}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
