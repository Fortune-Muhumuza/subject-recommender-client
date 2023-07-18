import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./components/UserContext";

import LoginForm from "./components/Login";
import Suggestions from "./components/Suggestions";
import DataForm from "./components/DataForm";
import Records from "./components/History";
import ProfilePage from "./components/Profile";
import ForgotPasswordForm from "./components/ForgotPassword";
import Signup from "./components/Signup";

const RoutesWithRedirect = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/home");
    } else if (!isAuthenticated && location.pathname !== "/login" && location.pathname !== "/forgotPassword" && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
      <Route path="/signup" element={<Signup />} />
      
      {isAuthenticated && (
        <>
          <Route
            path="/"
            element={
              <div className="page_contents">
                <DataForm />
                <Suggestions />
              </div>
            }
          />
          <Route path="/history" element={<Records />} />
          <Route path="/profile" element={<ProfilePage />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesWithRedirect;
