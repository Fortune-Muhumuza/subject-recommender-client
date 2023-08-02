import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const ChangePasswordModal = ({ visible, onClose, onChangePassword }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await onChangePassword(values);
      form.resetFields();
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Change Password"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="change" type="primary" loading={loading} onClick={handleSubmit}>
          Change Password
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please enter your old password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmNewPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
