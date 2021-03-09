import React, { memo, useRef, useEffect } from 'react'
import { Modal, Row, Col, Form, Input, message } from 'antd';
import { edit } from '@/services/paramsControl'
import { EditComponentWrapper } from './style'

export default memo(function AddComponent(props) {
  const { editObj }= props
  const formRef = useRef()
  useEffect(() => {
    if(formRef.current){
      formRef.current.setFieldsValue({
        type: editObj.type,
        code: editObj.code
      })
    }
  }, [editObj])
  const layout1 = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    }
  };
  const rules = {
    must: [{ required: true, message: '请有效填写该项' },{validator: (rule, value, callback) => handleValid(rule, value, callback)}],
  }
  const handleValid = (rule, value, callback) => {
    if(value && value.length <=0){
      return Promise.reject("请有效填写该项");
    }else{
      return Promise.resolve();
    }
  }
  const onFinish = (value) => {
    // console.log(value);
  }
  const onFinishFailed = (value) => {
    // console.log(value);
  }
  const handleOk = () => {
    formRef.current.validateFields().then(async(value) => {
      const res = await edit({
        id: editObj.id,
        type: value.type,
        code: value.code
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
      <Modal title="参数管理编辑" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
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
    </EditComponentWrapper>
  )
})
