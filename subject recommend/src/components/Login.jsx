import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "./UserContext";
import axios from "axios";
import { baseUrl } from "./baseVariables";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminUsername, setShowAdminUsername] = useState(false);
  const [form] = Form.useForm(); // Form instance to control form values

  // Fetch all student names when the component mounts
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

  const handleAdminSwitchChange = (checked) => {
    setIsAdmin(checked);
    setShowAdminUsername(checked); // Show/hide the admin username input based on the switch value
  };

  const onFinish = async (values) => {
    console.log(values)
        try {
      // For admin login, remove the adminUsername field from the form values to avoid any conflicts in the backend
    

      // Send a POST request to the backend server for login
      const response = await axios.post(`${baseUrl}/api/users/login`, values);
      const token = response.data.token;
      console.log("Login successful. Token:", token);
      const user = response.data.user;
      // Save the token to local storage
      // localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "student") {
        navigate("/");
      } else {
        navigate("/history");
      }

      // Update the authentication state to true
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Login failed:", error);
      alert("Sorry, there was an error. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login_container">
      <h3>Login</h3>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Admin Login"
          name="admin"
          valuePropName="checked" // To work with the Switch component
        >
          <Switch onChange={handleAdminSwitchChange} />
        </Form.Item>

        {/* {isAdmin && showAdminUsername && ( // Show the admin username input conditionally
          <Form.Item
            label="Admin Username"
            name="adminUsername"
            rules={[
              {
                required: true,
                message: "Please enter the admin username!",
              },
            ]}
          >
            <Input placeholder="Enter admin username" />
          </Form.Item>
        )} */}

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please select your username!",
            },
          ]}
        >
          {isAdmin ? (
            <Input placeholder="Enter your username" />
          ) : (
            <Select placeholder="Select your username" disabled={isAdmin}>
              {students.map((student) => (
                <Select.Option key={student._id} value={student.studentName}>
                  {student.studentName}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Link to="/signup">Create an account</Link>
        </Form.Item>

        {/* <Form.Item {...tailLayout}>
          <Link to="/forgotPassword">Forgot Password</Link>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default LoginForm;
