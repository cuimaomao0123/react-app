import React, { memo, useRef, useEffect } from 'react'
import { Modal, Row, Col, Form, Input, message } from 'antd';
import { addParam } from '@/services/paramsControl'
import { AddComponentWrapper } from './style'

export default memo(function AddComponent(props) {
  useEffect(() => {

    return () => {
    }
  }, [])
  const formRef = useRef()
  const layout1 = {
    labelCol: {
      span: 6,
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
      const res = await addParam({
        type: value.type,
        code: value.code
      })
      if(res.code === 200){
        message.success('添加成功!')
        props.close(true);
        formRef.current.resetFields();
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
    <AddComponentWrapper>
      <Modal title="新增管理员" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
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
                label="参数类型"
                rules={rules.must}
                name="type">
                <Input/>
              </Form.Item>
              <Form.Item
                label="参数代码(code)"
                rules={rules.must}
                name="code">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </AddComponentWrapper>
  )
})
