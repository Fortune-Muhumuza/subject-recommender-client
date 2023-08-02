import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize the user object with a default value that includes the role property
  const defaultUser = {
    role: "", // Set the default role here (e.g., "student" or "teacher")
  };

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString) || defaultUser;

  // Check if the user is already logged in based on the presence of user data
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  console.log('auth', isAuthenticated)

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
      {children}
    </UserContext.Provider>
  );
};
