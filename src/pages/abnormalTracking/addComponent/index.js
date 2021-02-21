import React, { memo, useReducer, useRef, useEffect } from 'react'
import { Modal, Row, Col, Form, Input, Radio, Select, message } from 'antd';
import reducer from './reducer'
import { getSelectList } from '@/services/abnormalImage'
import { getList } from '@/services/abnormalTracking'
import { AddComponentWrapper } from './style'
import "./reset.css";

const { Option } = Select;
export default memo(function AddComponent(props) {
  useEffect(() => {
    getSelectedList();
    return () => {
    }
  }, [])
  const formRef = useRef()
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    age: "",
    sex: "男",
    heat: "",
    address: "",
    identity: "",
    iphone: "",
    goSite: "",
    state: "",
    go: "",
    contact: "",  
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
      console.log(value);
      return Promise.reject("请有效填写该项");
    }else{
      return Promise.resolve();
    }
  }
  const sexChange = (value) => {
    dispatch({type: 'change_sex', payload: value.target.value})
  } 
  const selectChange = (value) => {
    const id = state.selectList.find(item => {
      return item.value === value;
    }).id;
    dispatch({type: 'change_site_id', payload: id})
  }
  const nameChange = (value) => {
    dispatch({type: 'change_name', payload: value.target.value})
  }
  const ageChange = (value) => {
    dispatch({type: 'change_age', payload: value.target.value})
  }
  const heatChange = (value) => {
    dispatch({type: 'change_heat', payload: value.target.value})
  }
  const addressChange = (value) => {
    dispatch({type: 'change_address', payload: value.target.value})
  }
  const identityChange = (value) => {
    dispatch({type: 'change_identity', payload: value.target.value})
  }
  const iphoneChange = (value) => {
    dispatch({type: 'change_iphone', payload: value.target.value})
  }
  const goSiteChange = (value) => {
    dispatch({type: 'change_go_site', payload: value.target.value})
  }
  const stateChange = (value) => {
    dispatch({type: 'change_state', payload: value.target.value})
  }
  const contactChange = (value) => {
    dispatch({type: 'change_contact', payload: value.target.value})
  }
  const goChange = (value) => {
    dispatch({type: 'change_go', payload: value.target.value})
  }
  const onFinish = (value) => {
    console.log(value);
  }
  const onFinishFailed = (value) => {
    console.log(value);
  }
  const handleOk = () => {
    formRef.current.validateFields().then(async(value) => {
      const res = await getList({
        name: state.name,
        age: state.age,
        sex: state.sex,
        heat: state.heat,
        address: state.address,
        identity: state.identity,
        iphone: state.iphone,
        goSite: state.goSite,
        state: state.state,
        go: state.go,
        contact: state.contact,  
        siteId: state.siteId
      })
      if(res.code === 200){
        message.success('添加成功!')
        props.close(true);
      }
    }).catch(err => {

    });
  }
  const handleCancel = () => {
    props.close()
  }
  return (
    <AddComponentWrapper>
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
                name="username">
                <Input onChange={nameChange}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="年龄"
                name="age">
                <Input onChange={ageChange}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="性别"
                name="sex">
                <Radio.Group onChange={sexChange} value={state.sex}>
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
                <Input onChange={heatChange}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="居住地"
                name="address">
                <Input onChange={addressChange}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="身份证"
                name="identity">
                <Input onChange={identityChange}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={rules.must}
                label="手机号"
                name="iphone">
                <Input onChange={iphoneChange}/>
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
                <Input onChange={goSiteChange}/>
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
                <Input onChange={stateChange}/>
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
                <Input onChange={goChange}/>
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
                <Input onChange={contactChange}/>
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
    </AddComponentWrapper>
  )
})
