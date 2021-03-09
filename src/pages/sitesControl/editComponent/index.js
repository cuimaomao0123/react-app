import React, { memo, useRef, useEffect, useReducer } from 'react'
import { Modal, Row, Col, Form, Input, message, Select } from 'antd';
import { edit, getTypeId, getDeviceId } from '@/services/sitesControl'
import reducer from './reducer'
import { EditComponentWrapper } from './style'

const { Option } = Select;
export default memo(function AddComponent(props) {
  const { editObj }= props
  useEffect(() => {
    if(formRef.current){
      formRef.current.setFieldsValue({
        site: editObj.site,
        longitude: editObj.longitude,
        latitude: editObj.latitude,
        typeId: editObj.typeName,
        facilityId: editObj.facilityName
      })
    }
  }, [editObj])
  useEffect(() => {
    getTypeSelect();
    getDeviceSelect();
  },[])
  const [state, dispatch] = useReducer(reducer, {
    typeSelect: [],
    deviceSelect: [],
    typeId: "",
    facilityId: ""
  })
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
      let typeId;
      let facilityId;
      if(state.typeId.length <=0){          //说明是默认值，没修改过
        typeId = Number(editObj.typeId)
      }else{
        typeId = state.typeId
      }
      if(state.facilityId.length <=0){    //说明是默认值，没修改过
        facilityId = Number(editObj.facilityId)
      }else{
        facilityId = state.facilityId
      }
      const res = await edit({
        id: editObj.id,
        site: value.site,
        longitude: value.longitude,
        latitude: value.latitude,
        typeId: Number(typeId),
        facilityId: Number(facilityId)
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
  const typeSelectChange = (value) => {
    dispatch({type: 'change_type_id', payload: value});
  }
  const facilitySelectChange = (value) => {
    dispatch({type: 'change_facility_id', payload: value});
  }
  return (
    <EditComponentWrapper>
      <Modal title="地点管理编辑" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
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
                <Select onChange={typeSelectChange}>
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
                <Select onChange={facilitySelectChange}>
                  {state.deviceSelect.map(item => {
                    return <Option key={item.id} value={item.id}>{item.value}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </EditComponentWrapper>
  )
})
