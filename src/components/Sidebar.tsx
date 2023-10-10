// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import classes from "./Sidebar.module.css";

function Sidebar() {
  return (
    <nav className={classes.sidebar}>
      <ul>
        <li>
          <Link to="/pages/testManagement">Test Management</Link>
        </li>
        <li>
          <Link to="/pages/resultRecords">Result Records</Link>
        </li>
        <li>
          <span>System Settings</span>
          <ul>
            <li>
              <Link to="/pages/settings/resultSettings">Result Settings</Link>
            </li>
            <li>
              <Link to="/pages/settings/logoSettings">Logo Settings</Link>
            </li>
            <li>
              <Link to="/pages/settings/accountSettings">Account Settings</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;