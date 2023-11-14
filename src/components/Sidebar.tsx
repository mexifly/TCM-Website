import React from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const location = useLocation();
  // Check if the current path starts with "/pages/settings" and set the active key accordingly
  const activeKey = location.pathname.startsWith("/pages/settings") ? "0" : "";

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <nav className="nav nav-pills flex-column">
        <Link className="nav-link" to="/pages/testManagement">
          Test Management
        </Link>
        <Link className="nav-link" to="/pages/resultSettings">
          Result Settings
        </Link>
        <Link className="nav-link" to="/pages/resultRecords">
          Test Result Records
        </Link>
        <Accordion defaultActiveKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>System Settings</Accordion.Header>
            <Accordion.Body>
              <Link className="nav-link" to="/pages/settings/logoSettings">
                Logo Settings
              </Link>
              <Link className="nav-link" to="/pages/settings/accountSettings">
                Account Settings
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </nav>
    </div>
  );
};

export default Sidebar;
