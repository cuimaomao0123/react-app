import React, { memo, useCallback, useState } from 'react';
import { Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Vertify from './vertify';
import { LoginBg, 
        LoginBox } from './style.js'

export default memo(function Login() {                //eslint-disable-next-line
  const [username, setusername] = useState("");       //eslint-disable-next-line
  const [password, setpassword] = useState("");       //eslint-disable-next-line
  const [authcode, setauthcode] = useState("");       
  const [code, setcode] = useState("");
  const getAuthCode = useCallback((code) => {
    setcode(code);
  },[])
  const layout = {
    wrapperCol: { span: 20 }
  };
  const codelayout = {
    wrapperCol: { span: 12 }
  };
  const butlayout = {
    wrapperCol: { offset: 0, span: 20 },
  };
  const onFinish = values => {
    setusername(values.username)
    setpassword(values.password)
    setauthcode(values.authcode)
    //发送请求
  };
  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };
  const handleUserName = (rule, value, callback) => {
    if(value && value.length <8){
      return Promise.reject("请输入有效用户名");
    }else{
      return Promise.resolve();
    }
  }
  const handlePassWord = (rule, value, callback) => {
    if(value && value.length <8){
      return Promise.reject("密码长度应大于等于8位");
    }else{
      return Promise.resolve();
    }
  }
  const handleAuthCode = (rule, value, callback) => {
    if((value && value.toUpperCase() !== code)){
      return Promise.reject("请输入正确验证码");
    }else{
      return Promise.resolve();
    }
  }
  const rules = {
    username: [{ required: true, message: '请输入用户名' },{validator: (rule, value, callback) => handleUserName(rule, value, callback)}],
    password: [{ required: true, message: '请输入密码' },{validator: (rule, value, callback) => handlePassWord(rule, value, callback)}],
    authcode: [{ required: true, message: '请输入验证码' },{validator: (rule, value, callback) => handleAuthCode(rule, value, callback)}]
  }

  return (
  <LoginBg>
    <LoginBox>
      <div className="title">公共场所应急防疫检测后台管理系统</div>
      <Form
      {...layout}
      name="basic"
      validateTrigger="onSubmit"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={rules.username}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={rules.password}
      >
         <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        {...codelayout}
        name="authcode"
        rules={rules.authcode}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item {...butlayout}>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
    <div id="login_vertify">
      <Vertify
        width={90}
        height={30}
        count={4}
        lineCount={10}
        pointCount={5}
        fontSize={25}
        onChange={getAuthCode}
        />
    </div>
    </LoginBox>
  </LoginBg>
  )
})
