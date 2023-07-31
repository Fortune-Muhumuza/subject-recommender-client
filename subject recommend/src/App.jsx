import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar";
import RoutesWithRedirect from "./RoutesWithRedirect";
import { DataProvider } from "./components/DataContext";

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="container">
          <ConditionalSidebar />
          <div>
            <RoutesWithRedirect />
          </div>
        </div>
      </DataProvider>
    </Router>
  );
}

function ConditionalSidebar() {
  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/forgotPassword" ||
    location.pathname === "/signup"
  ) {
    return null;
  }
  return <Sidebar />;
}

export default App;
