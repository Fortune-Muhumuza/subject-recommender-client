import React, { useEffect, useState } from "react";
import { Card, Input, Modal, Form, Button, List } from "antd";
import "./Profile.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { baseUrl } from "./baseVariables";

const { Search } = Input;
const { Item } = Form;
function ProfilePage() {
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] =
    useState(false);
  const [students, setStudents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleAddStudentModal = () => {
    setIsAddStudentModalVisible((prevState) => !prevState);
  };
  const handleSearch = async (searchText) => {
    setSearchText(searchText);
    if (searchText.trim() === "") {
      // If search text is empty, refetch all students from the backend API
      fetchAllStudents();
    } else {
      // Otherwise, filter students based on search text
      const filteredStudents = students.filter((student) =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase())
      );
      setStudents(filteredStudents);
    }
  };
  
  const handleAddStudentSubmit = async (values) => {
    try {
      // Convert the selected image file to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        // Create a new student object with image as base64 string
        const newStudent = {
          ...values,
          studentImage: reader.result,
        };

        // Send the new student data (including the image) to the backend
        axios.post(
          `${baseUrl}/api/users/addStudent`,
          newStudent
        );

        // Fetch updated list of students after adding
        const runOnSuccess = () => {
          fetchAllStudents();
          toggleAddStudentModal(); // Hide the modal after successful submission
          alert("Added successfully");
        };
        setTimeout(runOnSuccess, 4000);
      };
    } catch (error) {
      // Logic to handle error (e.g., show error message)
      console.error("Error adding student:", error);
    }
  };

  const fetchAllStudents = async () => {
    try {
      setFetching(true);
      const response = await axios.get(
        `${baseUrl}/api/users/allStudents`
      );
      setFetching(false);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    // Fetch all students from the backend API when the component mounts
    fetchAllStudents();
  }, []);

  return (
    <div  className="profile_container">
    <Card
      title={<h3>Students</h3>}
      bordered={false}
    >
      {/* Search bar */}
      <div className="search_bar">
      <Search
            placeholder="Search students..."
            enterButton
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
      </div>

      {/* Existing student profile */}
      <div className="profile_info">{/* ... (existing profile details) */}</div>

      {/* Add Student button */}
      <Button type="primary" onClick={toggleAddStudentModal}>
        Add Student
      </Button>

      {/* List of students */}
      {fetching ? (
        <ClipLoader />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={students}
          renderItem={(student) => (
            <List.Item key={student._id}>
              <Card
                title={student.studentName}
              >
                {/* Picture */}
                <div className="student_picture">
                  <img
                  className="student_picture"
                    src={`${student.studentImage}`}
                    alt={student.studentName}
                  />
                </div>

                {/* Student details */}
                <div className="student_details">
                  <p>
                    <b>Student ID:</b> {student.studentID}
                  </p>
                  <p>
                    <b>Grade Level:</b> {student.gradeLevel}
                  </p>
                  <p>
                    <b>Date of Birth (DOB):</b> {student.dob}
                  </p>
                  {/* <p>
                    <b>Subject Interests:</b>{" "}
                    {student.subjectInterests.join(", ")}
                  </p> */}
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}

      {/* Modal for adding a new student */}
      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onCancel={toggleAddStudentModal}
        footer={null}
      >
        <Form
          onFinish={handleAddStudentSubmit}
          layout="vertical" // Use vertical layout for two-column alignment
        >
          {/* Add your form fields for adding a new student here */}
          <Item
            label="Student Name"
            name="studentName"
            rules={[
              {
                required: true,
                message: "Please enter the student's name",
              },
            ]}
          >
            <Input placeholder="Enter student's name" />
          </Item>

          <Item
            label="Grade Level"
            name="gradeLevel"
            rules={[
              {
                required: true,
                message: "Please enter the student's grade level",
              },
            ]}
          >
            <Input placeholder="Enter student's grade level" />
          </Item>

          <Item
            label="Date of Birth (DOB)"
            name="dob"
            rules={[
              {
                required: true,
                message: "Please enter the student's date of birth",
              },
            ]}
          >
            <Input placeholder="Enter student's date of birth" />
          </Item>

         
          <Item
            label="Student Picture"
            name="studentImage"
            rules={[
              {
                required: true,
                message: "Please upload the student's picture",
              },
            ]}
          >
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </Item>

          {/* Submit button */}
          <Item>
            <Button type="primary" htmlType="submit">
              Add Student
            </Button>
          </Item>
        </Form>
      </Modal>
    </Card>
    </div>
  );
}

export default ProfilePage;
