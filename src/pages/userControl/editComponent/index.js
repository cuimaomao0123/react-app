import React, { memo, useRef, useEffect } from 'react'
import { Modal, Row, Col, Form, Input, message } from 'antd';
import { edit } from '@/services/userControl'
import md5 from 'js-md5';
import { EditComponentWrapper } from './style'

export default memo(function EditComponent(props) {
  const { editObj } = props
  const formRef = useRef()
  useEffect(() => {
    if(formRef.current){
      formRef.current.setFieldsValue({
        name: editObj.name,
        username: editObj.username
      })
    }
  }, [editObj])
  const layout1 = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    }
  };
  const rules = {
    must: [{ required: true, message: '请有效填写该项' },{validator: (rule, value, callback) => handleValid(rule, value, callback)}],
  }
  const handleValid = (rule, value, callback) => {
    if(value && value.length <=0){
      console.log(value);
      return Promise.reject("请有效填写该项");
    }else{
      return Promise.resolve();
    }
  }
  const onFinish = (value) => {
    console.log(value);
  }
  const onFinishFailed = (value) => {
    console.log(value);
  }
  const handleOk = () => {
    formRef.current.validateFields().then(async(value) => {
      const res = await edit({
        id: editObj.id,
        name: value.name,
        username: value.username,
        password: md5(value.password),
      })
      if(res.code === 200){
        message.success('编辑成功!')
        props.close(true);
      }else{
        message.error(res.msg)
      }
    }).catch(err => {
      message.warning('请填全有效信息!')
    });
  }
  const handleCancel = () => {
    props.close()
  }
  return (
    <EditComponentWrapper>
      <Modal title="编辑管理员" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...layout1}
          ref={formRef}
          name="basic"
          validateTrigger="onSubmit"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed} >
          <Row>
            <Col span={24}>
              <Form.Item
                label="姓名"
                rules={rules.must}
                name="name">
                <Input/>
              </Form.Item>
              <Form.Item
                label="用户名"
                rules={rules.must}
                name="username">
                <Input/>
              </Form.Item>
              <Form.Item
                label="密码"
                rules={rules.must}
                name="password">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </EditComponentWrapper>
  )
})
