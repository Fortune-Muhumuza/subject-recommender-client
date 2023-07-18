import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { MdHome, MdHistory, MdPerson, MdLock } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <img src="/logo.png" alt="LOGO" className="logo" />
      </div>
      <div className="sidebar_links">
        <ul>
          <li>
            <Link to="/">
              <div className="menu_container">
                <MdHome />
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <div className="menu_container">
              <MdHistory />
                <p>Records</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div className="menu_container">
                   <MdPerson />
                <p>Students</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <div className="menu_container">
              <MdLock />
                <p>Logout</p>
              </div>
            </Link>
          </li>
          
       
        </ul>
      </div>
      <div className="sidebar_footer">
        <p>Subject Recommender</p>
      </div>
    </div>
  );
};

export default Sidebar;
