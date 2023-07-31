import React, { useContext, useEffect, useState } from "react";
import { Card, Input } from "antd";
import { useData } from "./DataContext";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "./UserContext";
import './History.css'

const { Search } = Input;

function Records() {
  const { records, setRecords } = useData();
  const [searchText, setSearchText] = useState("");
  const [fetching, setFetching] = useState(false);
  const { user } = useContext(UserContext);

  const fetchRecords = async () => {
    try {
      setFetching(true);
      const endpoint = user.role === "teacher" ? "records" : `singleRecord/${user._id}`;
      const response = await axios.get(
        `https://subjectrec.onrender.com/api/recommendations/${endpoint}`
      );
      setFetching(false);

      if (user.role === "teacher") {
        setRecords(response.data.records);
      } else {
        setRecords([response.data.record]);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    // Fetch records from the backend API when the component mounts
    fetchRecords();
  }, []);
  const handleSearch = (searchText) => {
    setSearchText(searchText);
    if (user.role === "teacher") {
      if (searchText) {
        const filteredRecords = records.filter((record) =>
          record.studentName.toLowerCase().includes(searchText.toLowerCase())
        );
        setRecords(filteredRecords);
      } else {
        // If search text is empty, show all records
        fetchRecords();
      }
    }
  };
  return (
    <div className="history_container">
       {user.role === "teacher" && (
        <Search
          placeholder="Search students..."
          enterButton
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
      
      <Card
        
        title={<h3>Records</h3>}
        bordered={false}
      >
        {fetching ? (
          <ClipLoader />
        ) : (
          records?.map((record) => (
            <div key={record._id}>
              {/* Use a unique key for each record */}
              <p>
                <b>Student name:</b> {record.studentName || "N/A"}
                <b>Student ID:</b> {record.studentId || "N/A"}
              </p>
              {record.careerInterests && (
                <p>
                  <b>Career interests:</b>{" "}
                  {record.careerInterests.CareerInterest1},{" "}
                  {record.careerInterests.CareerInterest2}
                </p>
              )}
              <p>
                <b>Grades:</b>
              </p>
              <ul>
                {record.grades && (
                  <>
                    <li>Maths: {record.grades.Maths}%</li>
                    <li>Physics: {record.grades.Physics}%</li>
                    <li>Literature: {record.grades.Literature}%</li>
                    <li>Art: {record.grades.Art}%</li>
                  </>
                )}
              </ul>
              {/* Add other details as needed, e.g., hobbies, recommended subjects */}
              {/* ... */}
              {record.answer && (
                <>
                  <p>
                    <b>Summary:</b>
                  </p>
                  <p>{record.answer}</p>
                </>
              )}
              {record.createdAt && (
                <p>
                  <b>Date Submitted:</b> {record.createdAt}
                </p>
              )}
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

export default Records;
