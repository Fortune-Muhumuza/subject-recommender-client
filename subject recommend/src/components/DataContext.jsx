// DataContext.js
import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [fetchingAnswer, setFetchingAnswer] = useState(false);
  const [records, setRecords] = useState([]);

  return (
    <DataContext.Provider
      value={{
        apiResponse,
        setApiResponse,
        fetchingAnswer,
        setFetchingAnswer,
        records,
        setRecords,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
