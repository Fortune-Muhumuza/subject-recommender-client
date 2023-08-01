// Signup.js

import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;
const Signup = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Send a POST request to the backend server running on localhost:5000
      await axios.post(`${baseUrl}/api/users/register`, values);
      console.log("Success:", values);
      navigate('/login')
    } catch (error) {
      alert('sorry, something went wrong, try again')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login_container">
      <h3>Create an account</h3>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
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
            Register
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Link to="/forgotPassword">Forgot Password</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
