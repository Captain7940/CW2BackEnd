import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const response = await fetch('/api/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('Login successful');
        setIsShow(false);
        form.resetFields();
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(`Login failed: ${error}`);
    }
  };

  return (
    <>
      <Button icon={<UserOutlined />} onClick={() => setIsShow(true)} />
      <Modal open={isShow} onCancel={() => setIsShow(false)} title="Login" footer={[]}>
        <Form form={form} onFinish={handleLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Missing username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Missing password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
