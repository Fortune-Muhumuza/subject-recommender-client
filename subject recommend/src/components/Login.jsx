import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "./UserContext";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      // Send a POST request to the backend server for login
      const response = await axios.post("https://subjectrec.onrender.com/api/users/login", values);
      const token = response.data.token;
      console.log("Login successful. Token:", token);
      const user = response.data.user;
      // Save the token to local storage
      // localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if(user.role ==='student'){
navigate('/')}else{navigate('/history')}

      // Update the authentication state to true
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Login failed:", error);
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

        <Form.Item {...tailLayout}>
          <Link to="/forgotPassword">Forgot Password</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
