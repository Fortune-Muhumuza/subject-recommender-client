import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  // Check if the user is already logged in based on the presence of user data
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
      {children}
    </UserContext.Provider>
  );
};
