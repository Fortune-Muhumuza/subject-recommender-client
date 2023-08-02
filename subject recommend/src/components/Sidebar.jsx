import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { MdHome, MdHistory, MdPerson, MdLock } from "react-icons/md";
import { UserContext } from "./UserContext";

const Sidebar = () => {
  const { setIsAuthenticated, user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("user", user);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <img src="/logo.png" alt="LOGO" className="logo" />
      </div>
      <div className="sidebar_links">
        <ul>
          {user.role === "student" && (
            <>
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
            </>
          )}
          {user.role === "teacher" && (
            <>
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
            </>
          )}
          <li>
            <Link to="#">
              <div
                className="menu_container"
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                <MdLock />
              {  <p>Logout</p>}
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
