import React, { memo, useCallback } from 'react';
import { Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginBg, LoginBox } from './style.js'

export default memo(function Login() {
  const layout = {
    wrapperCol: { span: 20 }
  };
  const codelayout = {
    wrapperCol: { span: 12 }
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  const onFinish = useCallback(values => {
      console.log('Success:', values);
    },[]);
  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed:', errorInfo);
  },[]);
  const handleUserName = (rule, value, callback) => {
    if(value && value.length <8){
      return Promise.reject("请输入有效用户名");
    }else{
      return Promise.resolve();
    }
  }
  const rules = {
    username: [{ required: true, message: '请输入用户名' },{validator: (rule, value, callback) => handleUserName(rule, value, callback)}],
    password: [],
    authcode: []
  }

  // const [form] = Form.useForm();
  return (
  <LoginBg>
    <LoginBox>
      <div className="title">公共场所应急防疫检测后台管理系统</div>
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={rules.username}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名..." />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
         <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码..." />
      </Form.Item>
      <Form.Item
        {...codelayout}
        name="authcode"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入验证码..." />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </LoginBox>
  </LoginBg>
  )
})
