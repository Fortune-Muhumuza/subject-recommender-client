// DataForm.js
import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { useData } from "./DataContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./baseVariables";
import ChangePasswordModal from "./ChangePassword";

function DataForm() {
  const { setApiResponse, setFetchingAnswer } = useData();
  const [students, setStudents] = useState([]);
  const { user, setIsAuthenticated } = useContext(UserContext);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setFetchingAnswer(true);

      // Structure the input values into the question string
      const question = `A student named ${user.username} has ${values["Maths"]} in Maths, ${values["Physics"]} in Physics, ${values["technicalDrawing"]} in technical drawing, ${values["commerce"]} in commerce, ${values["ICT"]} in ICT, ${values["Literature"]} in Literature, ${values["Art"]} in Art, likes ${values["Hobby1"]}, ${values["Hobby2"]}, and ${values["CareerInterest1"]}. 
      Between only Technicaldrawing, Music, Literature, Art, ICT and commerce, which 3 subjects and career do you recommend they pursue? Please provide a summary of your recommendation and a list of the recommended subjects.`;
      // Send the structured question to the backend API
      const response = await axios.post(
        `${baseUrl}/api/recommendations/recommendations`,
        {
          question,
          studentId: user.studentID,
          studentName: user.username,
          ...values, // Include all form values (including StudentName) in the request body
        }
      );

      console.log("Response:", response.data.answer);
      setFetchingAnswer(false);
      setApiResponse(response.data.answer);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/allStudents`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

 

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleChangePassword = async (values) => {
    // Send the request to change the password here
    try {
      values.username=user.username
      await axios.post(`${baseUrl}/api/users/changePassword`, values);
      // Handle success
      console.log("Password changed successfully");
      alert("Password changed successfully")
    } catch (error) {
      // Handle error
      console.error("Error changing password:", error);
      alert("Error changing password")
    }
  };


  return (
    <div className="form">
      {user.role === "student" ? (
        <Form onFinish={onFinish}>
          <h4>Info</h4>
          <p>Logged in as: {user.username}</p>
          {/* <Form.Item
          label="Student Name"
          name="studentName"
          rules={[
            {
              required: true,
              message: "Please select student name",
            },
          ]}
        >
          <Select placeholder="Please select student name">
            {students.map((student) => (
              <Select.Option key={student._id} value={student._id}>
                {student.studentName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}

          <h4>Subjects</h4>
          <Form.Item
            label="Maths"
            name="Maths" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>

          <Form.Item
            label="Physics"
            name="Physics" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>

          <Form.Item
            label="Literature"
            name="Literature" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>

          <Form.Item
            label="Art"
            name="Art" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>
          <Form.Item
            label="TD"
            name="technicalDrawing" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>
          <Form.Item
            label="ICT"
            name="ICT" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>
          <Form.Item
            label="Commerce"
            name="commerce" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your subject marks",
              },
            ]}
          >
            <Input placeholder="Enter subject marks" />
          </Form.Item>

          <h4>Hobbies</h4>
          <Form.Item
            label="Hobby 1"
            name="Hobby1" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your hobby",
              },
            ]}
          >
            <Input placeholder="Enter your hobby" />
          </Form.Item>

          <Form.Item
            label="Hobby 2"
            name="Hobby2" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your hobby",
              },
            ]}
          >
            <Input placeholder="Enter your hobby" />
          </Form.Item>

          <h4>Career interests</h4>
          <Form.Item
            label="Career Interest 1"
            name="CareerInterest1" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your career interest",
              },
            ]}
          >
            <Input placeholder="Enter your career interest" />
          </Form.Item>

          <Form.Item
            label="Career Interest 2"
            name="CareerInterest2" // Use the correct name to match the question string
            rules={[
              {
                required: true,
                message: "Please enter your career interest",
              },
            ]}
          >
            <Input placeholder="Enter your career interest" />
          </Form.Item>

          <Form.Item>
            {user.role === "student" && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
          <Button onClick={handleOpenChangePasswordModal}>Change password</Button>
        </Form>
      ) : (
        <div
          onClick={() => {
            setIsAuthenticated(false);
            navigate("/login");
          }}
          style={{width: '400px', height:'150px', backgroundColor:'dodgerblue', padding:'10px', cursor:'pointer', color:'white', margin:'auto', fontSize: '20px'}}
        >
          <p>Welcome to the student recommender system</p>
          <p>Please click here to login first</p>
        </div>
      )}
          <ChangePasswordModal
        visible={showChangePasswordModal}
        onClose={handleCloseChangePasswordModal}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
}

export default DataForm;
