import React, { memo, useRef, useEffect } from 'react'
import { Modal, Row, Col, Form, Input, message } from 'antd';
import { edit } from '@/services/deviceDetail'
import { EditComponentWrapper } from './style'

export default memo(function AddComponent(props) {
  const { editObj }= props
  useEffect(() => {
    if(formRef.current){
      formRef.current.setFieldsValue({
        deviceName: editObj.name,
        deviceIp: editObj.moduleIp,
        devicePort: editObj.modulePort,
        serverIp: editObj.serverIp,
        serverPort: editObj.serverPort
      })
    }
  }, [editObj])
  const formRef = useRef()
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
        name: value.deviceName,
        moduleIp: value.deviceIp,
        modulePort: value.devicePort,
        serverIp: value.serverIp,
        serverPort: value.serverPort
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
                label="设备名称"
                rules={rules.must}
                name="deviceName">
                <Input/>
              </Form.Item>
              <Form.Item
                label="热成像与模块ip地址"
                rules={rules.must}
                name="deviceIp">
                <Input/>
              </Form.Item>
              <Form.Item
                label="热成像仪端口号"
                rules={rules.must}
                name="devicePort">
                <Input/>
              </Form.Item>
              <Form.Item
                label="服务器ip地址"
                rules={rules.must}
                name="serverIp">
                <Input/>
              </Form.Item>
              <Form.Item
                label="服务器ip端口号"
                rules={rules.must}
                name="serverPort">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </EditComponentWrapper>
  )
})
