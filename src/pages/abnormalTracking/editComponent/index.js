import React, { memo, useRef, useEffect, useReducer } from 'react'
import { Modal, Row, Col, Form, Input, Radio, Select, message } from 'antd';
import { getSelectList } from '@/services/abnormalImage'
import { edit } from '@/services/abnormalTracking'
import reducer from './reducer'
import { EditComponentWrapper } from './style'

const { Option } = Select;
export default memo(function EditComponent(props) {
  const { editObj } = props;
  useEffect(() => {
    getSelectedList();
  }, [])  
  useEffect(() => {
    if(formRef.current){
      formRef.current.setFieldsValue({
        name: editObj.name,
        age: editObj.age,
        sex: editObj.sex,
        heat: editObj.heat,
        address: editObj.address,
        identity: editObj.identity,
        iphone: editObj.iphone,
        goSite: editObj.goSite,
        state: editObj.state,
        go: editObj.go,
        contact: editObj.contact,
        siteId: editObj.site    //需要特殊设置
      })
    }
  }, [editObj])
  const formRef = useRef()
  const [state, dispatch] = useReducer(reducer, {
    sex: "",
    siteId: "",
    selectList: []
  });
  const layout1 = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    }
  };
  const layout2 = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    }
  }
  const rules = {
    must: [{ required: true, message: '请有效填写该项' },{validator: (rule, value, callback) => handleValid(rule, value, callback)}],
  }
  const getSelectedList = async () => {
    const res = await getSelectList();
    if(res.code === 200){
      let select = [...res.data];
      dispatch({type: 'change_select_list', payload: select})
    }
  }
  const handleValid = (rule, value, callback) => {
    if(value && value.length <=0){
      return Promise.reject("请有效填写该项");
    }else{
      return Promise.resolve();
    }
  }
  const selectChange = (value) => {
    const id = state.selectList.find(item => {
      return item.value === value;
    }).id;
    dispatch({type: 'change_site_id', payload: id})
  }
  const onFinish = (value) => {
    // console.log(value);
  }
  const onFinishFailed = (value) => {
    // console.log(value);
  }
  const handleOk = () => {
    formRef.current.validateFields().then(async(value) => {
      let siteId;
      if(state.siteId.length <=0){    //说明就是默认值，没有触发change事件
        siteId = state.selectList.find(item => {
          return item.value === editObj.site;
        }).id;
      }else{
        siteId = state.siteId;
      }
      const res = await edit({
        id: editObj.id,
        name: value.name,
        age: value.age,
        sex: value.sex,
        heat: value.heat,
        address: value.address,
        identity: value.identity,
        iphone: value.iphone,
        goSite: value.goSite,
        state: value.state,
        go: value.go,
        contact: value.contact,  
        siteId: Number(siteId)    //根据筛选得出id的
      })
      if(res.code === 200){
        message.success('编辑成功!')
        props.close(true);
      }else{
        message.error(res.msg)
      }
    }).catch(err => {

    });
  }
  const handleCancel = () => {
    props.close()
  }
  return (
    <EditComponentWrapper>
      <Modal title="新增异常人员信息" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...layout1}
          ref={formRef}
          name="basic"
          validateTrigger="onSubmit"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed} >
          <Row>
            <Col span={12}>
              <Form.Item
                label="姓名"
                rules={rules.must}
                name="name">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="年龄"
                name="age">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="性别"
                name="sex">
                <Radio.Group>
                  <Radio value={'男'}>男</Radio>
                  <Radio value={'女'}>女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="体温"
                name="heat">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="居住地"
                name="address">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="身份证"
                name="identity">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="手机号"
                name="iphone">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...layout2}
                rules={rules.must}
                label="14天到访地："
                name="goSite">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...layout2}
                rules={rules.must}
                label="14天有无病例："
                name="state">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...layout2}
                rules={rules.must}
                label="14天是否去过高风险地区："
                name="go">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...layout2}
                rules={rules.must}
                label="14天有无接触过患者"
                name="contact">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...layout2}
                rules={rules.must}
                label="设备采集地"
                name="siteId">
                <Select onChange={selectChange}>
                {
                  state.selectList.map(item => {
                    return <Option key={item.id} value={item.value}>{item.value}</Option>;
                  })
                }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </EditComponentWrapper>
  )
})
