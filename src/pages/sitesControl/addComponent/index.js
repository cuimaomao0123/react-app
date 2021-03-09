import React, { memo, useRef, useEffect, useReducer } from 'react'
import { Modal, Row, Col, Form, Input, message, Select  } from 'antd';
import { add, getTypeId, getDeviceId } from '@/services/sitesControl'
import reducer from './reducer'
import { AddComponentWrapper } from './style'

const { Option } = Select;
export default memo(function AddComponent(props) {
  const [state, dispatch] = useReducer(reducer, {
    typeSelect: [],
    deviceSelect: []
  })
  useEffect(() => {
    getTypeSelect();
    getDeviceSelect();
    return () => {
    }
  }, [])
  const formRef = useRef()
  const layout1 = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    }
  };
  const getTypeSelect = async() => {
    const res = await getTypeId();
    if(res.code === 200){ 
      dispatch({type: 'change_type_select', payload: res.data});
    }else{
      message.error(res.msg)
    }
  }
  const getDeviceSelect = async() => {
    const res = await getDeviceId();
    if(res.code === 200){ 
      dispatch({type: 'change_device_select', payload: res.data});
    }else{
      message.error(res.msg)
    }
  }
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
      const res = await add({
        site: value.site,
        longitude: value.longitude,
        latitude: value.latitude,
        typeId: Number(value.typeId),
        facilityId: Number(value.facilityId)
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
      <Modal title="地点管理新增" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
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
                label="地点"
                rules={rules.must}
                name="site">
                <Input/>
              </Form.Item>
              <Form.Item
                label="地点类型"
                rules={rules.must}
                name="typeId">
                <Select>
                  {state.typeSelect.map(item => {
                    return <Option key={item.id} value={item.id}>{item.value}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="所属经度"
                rules={rules.must}
                name="longitude">
                <Input/>
              </Form.Item>
              <Form.Item
                label="所属纬度"
                rules={rules.must}
                name="latitude">
                <Input/>
              </Form.Item>
              <Form.Item
                label="设备名称"
                rules={rules.must}
                name="facilityId">
                <Select>
                  {state.deviceSelect.map(item => {
                    return <Option key={item.id} value={item.id}>{item.value}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </AddComponentWrapper>
  )
})
