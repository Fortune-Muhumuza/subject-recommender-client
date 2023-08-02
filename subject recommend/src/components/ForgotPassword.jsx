import React from "react";
import { Form, Input, Button } from "antd";
import "./ForgotPassword.css";
import axios from "axios";
import { baseUrl } from "./baseVariables";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ForgotPasswordForm = () => {
  const onFinish = async(values) => {
    try {
  
      const response = await axios.post(`${baseUrl}/api/users/resetPassword`, values);
    
alert(response.data.message)
    } catch (error) {
      alert(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="forgot_password_container">
        <div className="forgot_password_form">
      <h3>Forgot Password</h3>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
