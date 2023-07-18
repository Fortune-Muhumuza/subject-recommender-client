import React from "react";
import { Form, Input, Button } from "antd";

function DataForm() {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  return (
    <div className="form">
      <Form onFinish={onFinish}>
        <h4>Subjects</h4>
        <Form.Item
          label="Maths"
          name="option 1"
          rules={[
            {
              required: true,
              message: "Please enter your subject",
            },
          ]}
        >
          <Input placeholder="Enter subject marks" />
        </Form.Item>

        <Form.Item
          label="Physics"
          name="option"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter subject marks" />
        </Form.Item>
        <Form.Item
          label="Literature"
          name="option"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter subject marks" />
        </Form.Item>
        <Form.Item
          label="Art"
          name="option"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter subject marks" />
        </Form.Item>
        <h4>Hobbies</h4>
        <Form.Item
          label="Option 1"
          name="option1"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter your option" />
        </Form.Item>
        <Form.Item
          label="Option 2"
          name="option2"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter your option" />
        </Form.Item>
        <h4>Career interests</h4>
        <Form.Item
          label="Option 1"
          name="careerOption1"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter your option" />
        </Form.Item>
        <Form.Item
          label="Option 2"
          name="careerOption2"
          rules={[
            {
              required: true,
              message: "Please enter your option",
            },
          ]}
        >
          <Input placeholder="Enter your option" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DataForm;
